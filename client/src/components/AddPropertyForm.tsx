import React, { useState } from 'react';
import axios from 'axios';
import './AddPropertyForm.css'; 

interface PropertyFormData {
  address: string;
  photo: string;
  price: string;
}

const AddPropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    address: '',
    photo: '',
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestData = {
      address: formData.address,
      photo: formData.photo,
      price: parseInt(formData.price) // Convert price to a number
    };
  
    axios.post('http://localhost:3000/api/properties', requestData)
      .then(response => console.log('Property added:', response.data))
      .catch(error => console.error('Error adding property:', error));
  };

  return (
    <form className="add-property-form" onSubmit={handleSubmit}>
      <h2>Add Property</h2>
      <label htmlFor="address">Address:</label>
      <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
      <label htmlFor="photo">Photo:</label>
      <input type="text" id="photo" name="photo" value={formData.photo} onChange={handleChange} required />
      <label htmlFor="price">Price:</label>
      <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddPropertyForm;
