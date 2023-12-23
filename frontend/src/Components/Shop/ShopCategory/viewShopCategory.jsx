import React from "react";
import axios from "axios";
import "./shopCategory.css";

const ViewShopCategory = ({ category, onDeleteSuccess }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/shopCategories/${category.id}`);
            console.log("Shop category deleted successfully!");
            onDeleteSuccess(category.id); 
        } catch (error) {
            console.error("Error deleting shop category:", error);
        }
    };    

    return (
        <div className="view-shop-category-container">
        <h1 className="title">Shop Category Details</h1>
        <p className="shop-category-detail">
            <strong>Name:</strong> {category.name}
        </p>
        <p className="shop-category-detail">
            <strong>Edible:</strong> {category.edible ? "Yes" : "No"}
        </p>
        <button onClick={handleDelete} className="delete-button">
            Delete Shop Category
        </button>
        </div>
    );
}

export default ViewShopCategory;