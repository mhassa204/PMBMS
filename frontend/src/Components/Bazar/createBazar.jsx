import React, { useState, useEffect } from "react";
import axios from "axios";
import "./bazar.css";

const CreateBazar = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [baseRentPermanent, setBaseRentPermanent] = useState("");
  const [prefix, setPrefix] = useState("");
  const [image, setImage] = useState("");
  const [zoneManager, setZoneManager] = useState("");
  const [bazarManager, setBazarManager] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const [shopTypes, setShopTypes] = useState([]);
  const [bazar, setBazar] = useState({
    name: "",
    address: "",
    city: "",
    zone: "",
    baseRentPermanent: "",
    prefix: "",
    image: "",
    zoneManager: "",
    bazarManager: "",
    supervisor: "",
    shopTypes: {},
  });
  const [shopType, setShopType] = useState({
    name: "",
    rent: "",
    rentType: "",
    security: "",
    securityType: "",
    bazar: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/cities")
      .then((res) => {
        console.log(res.data);
        setCities(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/zones")
      .then((res) => {
        console.log(res.data);
        setZones(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/shopTypes")
      .then((res) => {
        console.log(res.data);
        setShopTypes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetchData("http://localhost:8000/users", (data) => {
      const bazarManagers = data.filter(
        (user) => user.role === "BAZAR_MANAGER"
      );
      const zoneManagers = data.filter((user) => user.role === "ZONE_MANAGER");
      setBazarManager(bazarManagers);
      setZoneManager(zoneManagers);
    });
  }, []);

  const fetchData = (url, callback) => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        callback(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCity = (e) => {
    setBazar({ ...bazar, city: e.target.value });
  };

  const handleZone = (e) => {
    setBazar({ ...bazar, zone: e.target.value });
  };

  const handleShopType = (e) => {
    setShopType({ ...shopType, name: e.target.value });
  };

  const handleRent = (e) => {
    setShopType({ ...shopType, rent: e.target.value });
  };

  const handleRentType = (e) => {
    setShopType({ ...shopType, rentType: e.target.value });
  };

  const handleSecurity = (e) => {
    setShopType({ ...shopType, security: e.target.value });
  };

  const handleSecurityType = (e) => {
    setShopType({ ...shopType, securityType: e.target.value });
  };

  const handleBazar = (e) => {
    setShopType({ ...shopType, bazar: e.target.value });
  };

  const handleName = (e) => {
    setBazar({ ...bazar, name: e.target.value });
  };

  const handleAddress = (e) => {
    setBazar({ ...bazar, address: e.target.value });
  };

  const handleBaseRentPermanent = (e) => {
    setBazar({ ...bazar, baseRentPermanent: e.target.value });
  };

  const handlePrefix = (e) => {
    setBazar({ ...bazar, prefix: e.target.value });
  };

  const handleImage = (e) => {
    setBazar({ ...bazar, image: e.target.value });
  };

  const handleZoneManager = (e) => {
    setBazar({ ...bazar, zoneManager: e.target.value });
  };

  const handleBazarManager = (e) => {
    setBazar({ ...bazar, bazarManager: e.target.value });
  };

  const handleSupervisor = (e) => {
    setBazar({ ...bazar, supervisor: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/bazars", bazar)
      .then((res) => {
        console.log(res.data);
        alert("Bazar Created Successfully!");
      })
      .catch((err) => console.log(err));
  };

  const handleShopTypeSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/shopTypes", shopType)
      .then((res) => {
        console.log(res.data);
        alert("Shop Type Created Successfully!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Bazar Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Bazar Name"
                onChange={handleName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Bazar Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter Bazar Address"
                onChange={handleAddress}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">Select City</label>
              <select className="form-control" id="city" onChange={handleCity}>
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option value={city._id}>{city.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="zone">Select Zone</label>
              <select className="form-control" id="zone" onChange={handleZone}>
                <option value="">Select Zone</option>
                {zones.map((zone) => (
                  <option value={zone._id}>{zone.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="baseRentPermanent">Base Rent Permanent</label>
              <input
                type="text"
                className="form-control"
                id="baseRentPermanent"
                placeholder="Enter Base Rent Permanent"
                onChange={handleBaseRentPermanent}
              />
            </div>
            <div className="form-group">
              <label htmlFor="prefix">Prefix</label>
              <input
                type="text"
                className="form-control"
                id="prefix"
                placeholder="Enter Prefix"
                onChange={handlePrefix}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                className="form-control"
                id="image"
                placeholder="Enter Image"
                onChange={handleImage}
              />
            </div>
            <div className="form-group">
              <label htmlFor="zoneManager">Zone Manager</label>
              <input
                type="text"
                className="form-control"
                id="zoneManager"
                placeholder="Enter Zone Manager"
                onChange={handleZoneManager}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bazarManager">Bazar Manager</label>
              <input
                type="text"
                className="form-control"
                id="bazarManager"
                placeholder="Enter Bazar Manager"
                onChange={handleBazarManager}
              />
            </div>
            <div className="form-group">
              <label htmlFor="supervisor">Supervisor</label>
              <input
                type="text"
                className="form-control"
                id="supervisor"
                placeholder="Enter Supervisor"
                onChange={handleSupervisor}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Bazar
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <form onSubmit={handleShopTypeSubmit}>
            <div className="form-group">
              <label htmlFor="name">Shop Type Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Shop Type Name"
                onChange={handleShopType}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rent">Rent</label>
              <input
                type="text"
                className="form-control"
                id="rent"
                placeholder="Enter Rent"
                onChange={handleRent}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rentType">Rent Type</label>
              <input
                type="text"
                className="form-control"
                id="rentType"
                placeholder="Enter Rent Type"
                onChange={handleRentType}
              />
            </div>
            <div className="form-group">
              <label htmlFor="security">Security</label>
              <input
                type="text"
                className="form-control"
                id="security"
                placeholder="Enter Security"
                onChange={handleSecurity}
              />
            </div>
            <div className="form-group">
              <label htmlFor="securityType">Security Type</label>
              <input
                type="text"
                className="form-control"
                id="securityType"
                placeholder="Enter Security Type"
                onChange={handleSecurityType}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Bazar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBazar;
