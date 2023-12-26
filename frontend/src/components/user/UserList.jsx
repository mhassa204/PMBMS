import React, { useState, useEffect } from 'react';
import ViewUser from './viewUser';
import './user.css';
import CreateUserForm from './createUserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false); 

  const toggleCreateForm = () => {
    setShowCreateForm(prevState => !prevState); // Toggle the state to show/hide the create user form
  };

  useEffect(() => {
    // Fetch user data from an API endpoint
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/") // Replace with the correct API endpoint
        const userList = await response.json();
        setUsers(userList); // Set user data received from the API
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  // Remove user data from list after deleting from server


  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id)); // Update the user list after deletion
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user); // Set the selected user for editing
  };

  const handleClose = () => {
    setSelectedUser(null); // Reset selected user ID to close ViewUser
  };

  return (
    <main className={`user-list ${showCreateForm ? 'blur' : ''}`}>
    <section className='tableHeader'>
      <h2>User List</h2>
      <button className='createButton' onClick={toggleCreateForm}>+</button> {/* Button to toggle create user form */}
    </section>
    {showCreateForm && (
      <div className="modal">
          <CreateUserForm onClose={toggleCreateForm} />
      </div>
    )}

      <section className='tableBody'>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone #</th>
            <th>Status</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            
            <tr key={index}
            className={` row ${user.status === 'inactive' ? 'inactive' : ''}`} 
            onClick={() => handleView(user)}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.phone}</td>
              <td>{user.status}</td>
              <td>{user.userType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </section>
      {/* Display ViewUser if selectedUserId is not null*/}
      {selectedUser && (
        <div className="view-user-overlay">
          <ViewUser user={selectedUser} onClose={handleClose} />
        </div>
      )}
      {/* Display editUser if selectedUserId is not null*/}
    </main>
  );
};

export default UserList;
