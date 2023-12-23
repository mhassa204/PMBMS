import React, { useState } from 'react';
import axios from 'axios';
import './shopCategory.css';

const EditShopCategory = ({ category ,onUpdateSuccess}) => {
    const [edible, setEdible] = useState(category.edible);
    const [name, setName] = useState(category.name);

    const handleEdibleChange = (e) => {
        setEdible(e.target.checked);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            alert('Please enter a category name.');
            return;
        }
        try {
            await axios.put(`http://localhost:8000/shopCategories/${category.id}`, {
                name,
                edible,
            });
            console.log('Shop category updated successfully!');
            onUpdateSuccess();
        } catch (error) {
            console.error('Error updating shop category:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-shop-category">
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
            />
            <label htmlFor="edible">Edible:</label>
            <input
                type="checkbox"
                name="edible"
                checked={edible}
                onChange={handleEdibleChange}
            />
            <button type="submit">Update Shop Category</button>
        </form>
    );
};

export default EditShopCategory;
