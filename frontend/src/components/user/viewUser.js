import React, { useState, useEffect } from 'react';
import EditUserForm from './editUserform';
import DeleteUser from './deleteUser';
import './viewUserStyle.css';


const ViewUser = ({user,onClose}) => {
  const [userData, setUserData] = useState(user);
  const [editButton, setEditButton] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleConfirmation = () => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  };

  const handleEdit = () => {
    setEditButton(!editButton);
  };


  const handleUserChange = (changedUser) => {
    setUserData(changedUser);
  };

  //use effect to make it rerender everytime user is changed
  useEffect(() => {
    setUserData(user);
  }, [user]);

  return (
    <div className="user-details">
      <div  className='title'>
      <h2>User Details</h2>
      </div>
      <span className="close-btn" onClick={onClose}>X</span>
      <div className='form-data'>
       {Object.entries(userData).map(([key, value], index) => (
        <p key={index}>{key}: {value}</p>
        ))}
        
        {/* <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
        <p>Password: {userData.password}</p>
        <p>Phone #: {userData.phone}</p>
        <p>Status: {userData.status}</p>
        <p>User Type: {userData.userType}</p> */}
        {/* Display other user details based on the received user data */}
      </div>
      <div className="button-container">
        <button className="editButton" onClick={handleEdit}>
          Edit
        </button>
        {/* <button className="deleteButton" onClick={handleDelete}>
          Delete
        </button> */}
        <DeleteUser
          user={userData}
          showConfirmation={showDeleteConfirmation}
          handleConfirmation={handleConfirmation}
          />
        {editButton && <EditUserForm user={userData} handleEdit={handleEdit} handleUserChange={handleUserChange} />}
          </div>
    </div>
  );
};

export default ViewUser;
