import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './shopCategory.css';

const CreateShopCategory = ({onCreateSuccess}) => {
  const [formData, setFormData] = useState({
    name: '',
    edible: false,
  });
  useEffect(() => {
    axios
      .get('http://localhost:8000/shopCategories')
      .then((response) => console.log(response.data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name) {
    alert('Please enter a category name.');
    return;
  }
  try {
    const response = await axios.post('http://localhost:8000/shopCategories', formData);
    console.log('Shop category created successfully!');
    setFormData({ edible: false, name: '' });
    onCreateSuccess(response.data);
  } catch (error) {
    console.error('Error creating shop category:', error);
  }
};

  return (
    <form onSubmit={handleSubmit} className="create-shop-category">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="edible">Edible:</label>
      <input
        type="checkbox"
        name="edible"
        checked={formData.edible}
        onChange={handleChange}
      />
      <button type="submit">Create Shop Category</button>
    </form>
  );
};

export default CreateShopCategory;