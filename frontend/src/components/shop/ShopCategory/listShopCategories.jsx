import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateShopCategory from "./createShopCategory";
import EditShopCategory from "./editShopCategory";
import ViewShopCategory from "./viewShopCategory";
import "./shopCategory.css";

const ListShopCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [action, setAction] = useState("list");

  useEffect(() => {
    axios
      .get("http://localhost:8000/shopCategories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleCreateSuccess = async () => {
    try {
      const response = await axios.get('http://localhost:8000/shopCategories');
      setCategories(response.data);
      setAction("list");
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  const handleUpdateSuccess = (updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    setAction("list");
  };

  const handleDeleteSuccess = (deletedCategoryId) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== deletedCategoryId)
    );
    setAction("list");
  };
  
  
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setAction("edit");
  };

  const handleViewClick = (category) => {
    setSelectedCategory(category);
    setAction("view");
  };

  const handleCreateClick = () => {
    setAction("create");
  };

  const handleCancelClick = () => {
    setAction("list");
  };

  return (
    <div className="list-shop-categories-container">
      <h1 className="title">Shop Categories</h1>
      {action === "list" && (
        <div className="list-shop-categories">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className="shop-category">
                <p className="shop-category-name">{category.name}</p>
                <button
                  className="view-button"
                  onClick={() => handleViewClick(category)}
                >
                  View
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(category)}
                >
                  Edit
                </button>
              </div>
            ))
          ) : (
            <p>No shop categories</p>
          )}
          <button className="create-button" onClick={handleCreateClick}>
            Create Shop Category
          </button>
        </div>
      )}
      {action === "create" && (
      <CreateShopCategory onCreateSuccess={handleCreateSuccess} />
        )}
      {action === "edit" && (
        <EditShopCategory
          category={selectedCategory}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
      {action === "view" && (
        <ViewShopCategory
          category={selectedCategory}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
      {action !== "list" && (
        <button className="cancel-button" onClick={handleCancelClick}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default ListShopCategories;