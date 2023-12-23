import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import "./shop.css";

const EditShop = ({initialData, onUpdateSuccess}) => {
  const [formData, setFormData] = useState({
        id: initialData.id,
        shopID: initialData.shopID,
        shopCategory: initialData.shopCategory,
        shopType: initialData.shopType,
        vacant: initialData.vacant,
        bazar: initialData.bazar,
        size: initialData.size,
    });
    const [shopCategories, setShopCategories] = useState([]);
    const [shopTypes, setShopTypes] = useState([]);

    useEffect(() => {
        fetchShopCategories();
        fetchShopTypes();
    }
    , []);

    const fetchShopCategories = async () => {
        try {
          console.log("http://localhost:8000/shopCategories");
            const response = await axios.get("http://localhost:8000/shopCategories");
            setShopCategories(response.data);
        } catch (error) {
            console.error("Error fetching shop categories:", error);
        }
    }

    const fetchShopTypes = async () => {
        try {
          console.log("http://localhost:8000/shopTypes");
            const response = await axios.get("http://localhost:8000/shopTypes");
            setShopTypes(response.data);
        } catch (error) {
            console.error("Error fetching shop types:", error);
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!formData.id) {
          console.error('Missing ID in formData');
          return;
        }
      
        axios
          .put(`http://localhost:8000/shops/${formData.id}`, {
            shopID: formData.shopID,
            shopCategory: formData.shopCategory,
            shopType: formData.shopType,
            vacant: formData.vacant,
            bazar: formData.bazar,
            size: formData.size,
            id: formData.id,
          })
          .then((response) => {
            console.log(response.data);
            onUpdateSuccess();
          })
          .catch((error) => console.error(error));
      };
      

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 card card-body mt-5">
                    <h3>Edit Shop</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="shopID">Shop ID</label>
                            <input
                                type="text"
                                id="shopID"
                                name="shopID"
                                className="form-control"
                                value={formData.shopID}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shopCategory">Shop Category</label>
                            <select
                                id="shopCategory"
                                name="shopCategory"
                                className="form-control"
                                value={formData.shopCategory}
                                onChange={handleChange}
                            >
                                <option value="">Select a shop category</option>
                                {shopCategories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="shopType">Shop Type</label>
                            <select
                                id="shopType"
                                name="shopType"
                                className="form-control"
                                value={formData.shopType}
                                onChange={handleChange}
                            >
                                <option value="">Select a shop type</option>
                                {shopTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="vacant">Vacant</label>
                            <input
                                type="checkbox"
                                id="vacant"
                                name="vacant"
                                className="form-control"
                                checked={formData.vacant}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bazar">Bazar</label>
                            <input
                                type="text"
                                id="bazar"
                                name="bazar"
                                className="form-control"
                                value={formData.bazar}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="size">Size</label>
                            <input
                                type="text"
                                id="size"
                                name="size"
                                className="form-control"
                                value={formData.size}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Update Shop
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditShop;