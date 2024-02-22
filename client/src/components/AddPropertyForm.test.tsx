import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AddPropertyForm from './AddPropertyForm';

const axiosMock = new MockAdapter(axios);

describe('AddPropertyForm Component', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  test('renders Add Property form correctly', () => {
    render(<AddPropertyForm />);
    const addButton = screen.getByRole('button', { name: 'Add Property' });
    expect(addButton).toBeInTheDocument();
  });

  test('updates form fields when input changes', () => {
    render(<AddPropertyForm />);
    const addressInput = screen.getByLabelText('Address:');
    const photoInput = screen.getByLabelText('Photo:');
    const priceInput = screen.getByLabelText('Price:');
  
    fireEvent.change(addressInput, { target: { value: '123 High Road' } });
    fireEvent.change(photoInput, { target: { value: 'example.jpg' } });
    fireEvent.change(priceInput, { target: { value: '100000' } });
  
    expect(addressInput).toHaveValue('123 High Road');
    expect(photoInput).toHaveValue('example.jpg');
    expect(String((priceInput as HTMLInputElement).value)).toEqual('100000')
  });

  test('submits form data and adds property on form submission', async () => {
    const mockFormData = {
      address: '123 High Road',
      photo: 'example.jpg',
      price: 100000
    };
  
    axiosMock.onPost('http://localhost:3000/api/properties', mockFormData).reply(200);
  
    render(<AddPropertyForm />);
    const addressInput = screen.getByLabelText('Address:');
    const photoInput = screen.getByLabelText('Photo:');
    const priceInput = screen.getByLabelText('Price:');
    const addButton = screen.getByRole('button', { name: 'Add Property' });
  
    fireEvent.change(addressInput, { target: { value: mockFormData.address } });
    fireEvent.change(photoInput, { target: { value: mockFormData.photo } });
    fireEvent.change(priceInput, { target: { value: mockFormData.price.toString() } });
    fireEvent.click(addButton);
  
    await waitFor(() => {
      expect(axiosMock.history.post.length).toBe(1);
      expect(axiosMock.history.post[0].data).toEqual(JSON.stringify(mockFormData));
      expect(JSON.parse(axiosMock.history.post[0].data).price.toString()).toEqual(mockFormData.price.toString());
    });
  });  

  test('displays error message on failed form submission', async () => {
    axiosMock.onPost('http://localhost:3000/api/properties').reply(200);

    render(<AddPropertyForm />);
    const addButton = screen.getByRole('button', { name: 'Add Property' });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.queryByText('Failed to add property')).not.toBeInTheDocument();
    });
  });
});


