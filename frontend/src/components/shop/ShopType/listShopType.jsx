import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateShopType from './createShopType';
import './shopType.css';

const ListShopType = () => {
  const [shopTypes, setShopTypes] = useState([]);

  const getShopTypes = async () => {
    try {
      const res = await axios.get('http://localhost:8000/shopTypes');
      setShopTypes(res.data);
    } catch (err) {
      console.error('Error fetching shop types:', err.message);
    }
  };

  useEffect(() => {
    getShopTypes();
  }, []);

  const deleteShopType = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/shopTypes/${id}`);
      setShopTypes(shopTypes.filter((shopType) => shopType.id !== id));
    } catch (err) {
      console.error('Error deleting shop type:', err.message);
    }
  };

  const handleCreateShopType = (shopType) => {
    setShopTypes([...shopTypes, shopType]);
  };

  return (
    <div className='list-shop-type-container'>
      <h1>List Shop Type</h1>
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {shopTypes.map((shopType) => (
            <tr key={shopType.id}>
              <td>{shopType.name}</td>
              <td>
                <button className='btn btn-danger' onClick={() => deleteShopType(shopType.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreateShopType handleCreateShopType={handleCreateShopType} />
    </div>
  );
};

export default ListShopType;