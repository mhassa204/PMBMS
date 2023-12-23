import React from "react";
import axios from "axios";
import "./shop.css";

const ViewShop = ({ shopData, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/shops/${shopData.id}`);
      console.log("Shop deleted successfully!");
      onDeleteSuccess(); // Notify the parent component
    } catch (error) {
      console.error("Error deleting shop:", error);
    }
  };

  return (
    <div className="view-shop-container">
      <h1 className="title">Shop Details</h1>
      <p className="shop-detail">
        <strong>Shop ID:</strong> {shopData.shopID}
      </p>
      <p className="shop-detail">
        <strong>Shop Category:</strong> {shopData.shopCategory}
      </p>
      <p className="shop-detail">
        <strong>Shop Type:</strong> {shopData.shopType}
      </p>
      <p className="shop-detail">
        <strong>Vacant:</strong> {shopData.vacant ? "Yes" : "No"}
      </p>
      <p className="shop-detail">
        <strong>Bazar:</strong> {shopData.bazar}
      </p>
      <p className="shop-detail">
        <strong>Size:</strong> {shopData.size}
      </p>
      <button onClick={handleDelete} className="delete-button">
        Delete Shop
      </button>
    </div>
  );
};

export default ViewShop;