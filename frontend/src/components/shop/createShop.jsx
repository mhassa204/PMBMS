import React, { useState, useEffect } from "react";
import axios from "axios";
import "./shop.css";

const CreateShop = (props) => {
  const [shopID, setShopID] = useState("");
  const [shopCategory, setShopCategory] = useState("");
  const [shopType, setShopType] = useState("");
  const [vacant, setVacant] = useState(true);
  const [bazar, setBazar] = useState("");
  const [size, setSize] = useState("");
  const [shopCategories, setShopCategories] = useState([]);
  const [shopTypes, setShopTypes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/shopCategories")
      .then((response) => setShopCategories(response.data))
      .catch((error) => console.error(error));

    axios
      .get("http://localhost:8000/shopTypes")
      .then((response) => setShopTypes(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/shops", {
        shopID,
        shopCategory,
        shopType,
        vacant,
        bazar,
        size,
      })
      .then((response) => {
        console.log(response.data);
        props.history.push("/shops");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 card card-body mt-5">
          <h3>Create Shop</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="shopID">Shop ID</label>
              <input
                type="text"
                id="shopID"
                name="shopID"
                className="form-control"
                value={shopID}
                onChange={(e) => setShopID(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="shopCategory">Shop Category</label>
              <select
                id="shopCategory"
                name="shopCategory"
                className="form-control"
                value={shopCategory}
                onChange={(e) => setShopCategory(e.target.value)}
              >
                <option value="">Select Shop Category</option>
                {shopCategories.map((shopCategory) => (
                  <option key={shopCategory._id} value={shopCategory._id}>
                    {shopCategory.name}
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
                value={shopType}
                onChange={(e) => setShopType(e.target.value)}
              >
                <option value="">Select Shop Type</option>
                {shopTypes.map((shopType) => (
                  <option key={shopType._id} value={shopType._id}>
                    {shopType.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="vacant">Vacant</label>
              <select
                id="vacant"
                name="vacant"
                className="form-control"
                value={vacant ? "true" : "false"}
                onChange={(e) => setVacant(e.target.value === "true")}
              >
                <option value="">Select Vacant</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bazar">Bazar</label>
              <input
                type="text"
                id="bazar"
                name="bazar"
                className="form-control"
                value={bazar}
                onChange={(e) => setBazar(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="size">Size</label>
              <input
                type="text"
                id="size"
                name="size"
                className="form-control"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Shop
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateShop;
