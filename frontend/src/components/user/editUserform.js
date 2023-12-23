import React, { useState } from "react";
import {
  FaCheckCircle,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUserShield,
  FaUserCog,
  FaUsers,
  FaUserTie,
  FaUser,
} from "react-icons/fa";

import "./editFormStyle.css";

const EditUserForm = ({user,handleEdit,handleUserChange}) => {
  const [formData, setFormData] = useState(user);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear previous errors when the user starts typing
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation, you can add more complex validation if needed
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const renderIcon = (fieldName) => {
    if (formData[fieldName] && !errors[fieldName]) {
      return <FaCheckCircle className="check-icon" />;
    }
    return null;
  };

  const editUser = async (userData) => {
    const response = await fetch(`http://localhost:3000/users/${userData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form before submitting
    if (validateForm()) {
      // Form data is valid, submit the form)
      editUser(formData);
      handleUserChange(formData);
      handleEdit();
    } else {
      console.log("Form contains errors. Please correct them.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Update {formData.username}</h2>

        <div className="input-container">
          <label>Username:</label>
          <div className="relative flex items-center">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-style"
            />
            {errors.username && (
              <p className="error-message">{errors.username}</p>
            )}
            {renderIcon("username")}
            <FaUser className="username-icon" />{" "}
            {/* Use FaUser for the username icon */}
          </div>
        </div>

        <div className="input-container">
          <label>Email:</label>
          <div className="relative flex items-center">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-style"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
            <FaEnvelope className="email-icon" />
          </div>
        </div>

        <div className="input-container">
          <label>Password:</label>
          <div className="relative flex items-center">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-style"
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
            {renderIcon("password")}
            <FaLock className="password-icon" />{" "}
            {/* Use FaLock for the password icon */}
          </div>
        </div>

        <div className="input-container">
          <label>Phone #:</label>
          <div className="relative flex items-center">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-style"
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
            <FaPhone className="phone-icon" />
          </div>
        </div>

        <div className="input-container">
          <label>User Type:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="select-style"
          >
            <option value="SuperAdmin">
              <FaUserShield className="super-admin-icon" /> SuperAdmin
            </option>
            <option value="Admin">
              <FaUserCog  className="admin-icon"/> Admin
            </option>
            <option value="ZoneManager">
              <FaUsers  className="zone-manager-icon"/> Zone Manager
            </option>
            <option value="Supervisor">
              <FaUserTie className="supervisor-icon" /> Supervisor
            </option>
            <option value="BazarManager">
              <FaUser className="bazar-manager-icon"/> Bazar Manager
            </option>
          </select>
        </div>
        <div className="buttons">
        <button type="submit" className="edit-button">
          update User
        </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
