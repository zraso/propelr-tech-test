import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PropertyList from './PropertyList';

const axiosMock = new MockAdapter(axios);

const initialProperties = [
  { id: 1, address: '123 High Road', photo: 'example1.jpg', price: 100000 },
  { id: 2, address: '46 Station Road', photo: 'example2.jpg', price: 150000 }
];

const updatedProperties = [
  ...initialProperties,
  { id: 3, address: '23 Junction Road', photo: 'example3.jpg', price: 200000 }
];

describe('PropertyList Component', () => {
  beforeEach(() => {
    axiosMock.onGet('http://localhost:3000/api/properties').reply(200, initialProperties);

    axiosMock.onGet('http://localhost:3000/api/properties').replyOnce(() => [200, initialProperties]);
  });

  test('renders property list correctly with updated properties', async () => {
    const { getByAltText, getByText, findByText } = render(<PropertyList />);

    await waitFor(() => {
      initialProperties.forEach(property => {
        expect(getByText(property.address)).toBeInTheDocument();
        expect(getByAltText(property.address)).toBeInTheDocument();
      });
    });

    await act(async () => {
      await waitFor(() => {
        updatedProperties.forEach(async property => {
          await findByText((content, element) => {
            if (element && element.tagName.toLowerCase() === 'div' && element.textContent?.includes(`$${property.price}`)) {
              return true;
            }
            return false;
          });
        });
      });
    });
  });
});