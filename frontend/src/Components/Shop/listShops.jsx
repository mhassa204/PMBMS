import React from "react";
import axios from "axios";
import CreateShop from "./createShop";
import EditShop from "./editShop";
import ViewShop from "./viewShop";
import "./shop.css";
import { useState, useEffect } from "react";

const ListShops = () => {
    const [shops, setShops] = useState([]);
    const [shopCategories, setShopCategories] = useState([]);
    const [shopTypes, setShopTypes] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);
    const [creating, setCreating] = useState(false);
    const [editing, setEditing] = useState(false);
    const [mode, setMode] = useState("view");
    const [formData, setFormData] = useState({
        shopID: "",
        shopCategory: "",
        shopType: "",
        vacant: true,
        bazar: "",
        size: "",
    });

    useEffect(() => {
        fetchShops();
    }
    , []);

    const fetchShops = async () => {
        try {
            const response = await axios.get("http://localhost:8000/shops");
            setShops(response.data);
        } catch (error) {
            console.error("Error fetching shops:", error);
        }
    }

    const fetchShopCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8000/shopCategories");
            setShopCategories(response.data);
        } catch (error) {
            console.error("Error fetching shop categories:", error);
        }
    }

    const fetchShopTypes = async () => {
        try {
            const response = await axios.get("http://localhost:8000/shopTypes");
            setShopTypes(response.data);
        } catch (error) {
            console.error("Error fetching shop types:", error);
        }
    }

    const handleCreate = async (newShop) => {
        try {
            await axios.post("http://localhost:8000/shops", newShop);
            console.log("Shop created successfully!");
            setCreating(false);
            fetchShops();
        } catch (error) {
            console.error("Error creating shop:", error);
        }
    }

    const handleView = async (shop, onDeleteSuccess) => {
        if (selectedShop === shop) { 
            setSelectedShop(null);
        } else {
            setSelectedShop(shop);
        }
        setMode("view");
    }

    const handleEdit = async (shop, onUpdateSuccess) => {
        try {
            await fetchShopCategories();
            await fetchShopTypes();
            setSelectedShop(shop);
            setMode("edit");
        } catch (error) {
            console.error("Error fetching shop categories and types for editing:", error);
        }
    }


    const handleDelete = async (shop) => {
        try {
            await axios.delete(`http://localhost:8000/shops/${shop.id}`);
            console.log("Shop deleted successfully!");
            fetchShops();
        } catch (error) {
            console.error("Error deleting shop:", error);
        }
    }

    const onUpdateSuccess = () => {
        fetchShops();
        setMode("view");
    }

    const handleCancel = () => {
        setMode("view");
    }

    const onDeleteSuccess = () => {
        fetchShops();
        setMode("view");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/shops/${formData.id}`, {
                shopID: formData.shopID,
                shopCategory: formData.shopCategory,
                shopType: formData.shopType,
                vacant: formData.vacant,
                bazar: formData.bazar,
                size: formData.size,
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
                <div className="col-md-12 card card-body mt-5">
                    <h2>Shops</h2>
                    <button onClick={() => setCreating(true)} className="create-button">
                        Create Shop
                    </button>
                    {creating && (
                        <CreateShop
                            onCreateSuccess={handleCreate}
                            onCancel={handleCancel}
                        />
                    )}
                    {selectedShop && mode === "edit" && (
                        <EditShop
                            initialData={selectedShop}
                            onUpdateSuccess={onUpdateSuccess}
                            onCancel={handleCancel}
                        />
                    )}
                    {selectedShop && mode === "view" && (
                        <ViewShop
                            shopData={selectedShop}
                            onDeleteSuccess={onDeleteSuccess}
                        />
                    )}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Shop ID</th>
                                <th>Shop Category</th>
                                <th>Shop Type</th>
                                <th>Vacant</th>
                                <th>Bazar</th>
                                <th>Size</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shops.map((shop) => (
                                <tr key={shop.id}>
                                    <td>{shop.shopID}</td>
                                    <td>{shop.shopCategory}</td>
                                    <td>{shop.shopType}</td>
                                    <td>{shop.vacant ? "Yes" : "No"}</td>
                                    <td>{shop.bazar}</td>
                                    <td>{shop.size}</td>
                                    <td>
                                        <button
                                            onClick={() => handleView(shop)}
                                            className="view-button"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleEdit(shop, onUpdateSuccess)}
                                            className="edit-button"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(shop)}
                                            className="delete-button"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}

export default ListShops;