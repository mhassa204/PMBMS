import React, { useState } from 'react';
import './viewUserStyle.css';
const DeleteUser = ({ user, showConfirmation, handleConfirmation, }) => {

  const handleDelete = async () => {
    try {
      // Delete user data from the server using Fetch API
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'DELETE',
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });

      if (response.ok) {
        // Data deleted successfully
        console.log('User data deleted');
        // Close the modal
        handleConfirmation();
      } else {
        // Error occurred while deleting data
        console.error('Failed to delete user data');
        // render the error message returned from the server
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Failed to delete user data', error);
    }
  };

  return (
    <div>
      <button className='delete-button' onClick={handleConfirmation}>Delete User</button>

      {showConfirmation && (
        <div>
          <p>Are you sure you want to delete this user?</p>
          <p>User ID: {user.id}</p>
          <p>User Name: {user.username}</p>

          <button onClick={handleDelete}>Confirm Delete</button>
          <button onClick={handleConfirmation}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
