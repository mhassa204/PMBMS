import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './shopType.css';

const CreateShopType = ({ handleCreateShopType }) => {
  const [formData, setFormData] = useState({
    name: '',
  });
  const { name } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/shopTypes')
      .then((response) => console.log(response.data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert('Please enter a shop type name.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/shopTypes', formData);
      console.log('Shop type created successfully!');
      setFormData({ name: '' });

      if (handleCreateShopType) {
        handleCreateShopType(response.data);
      }
    } catch (error) {
      console.error('Error creating shop type:', error);
    }
  };

  return (
    <div className='create-shop-type-container'>
      <h1>Create Shop Type</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <label htmlFor='name'>Shop Type Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            placeholder='Enter Shop Type Name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateShopType;