const jwt = require('jsonwebtoken');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();



const validateToken = (allowedUsers) => {
    return async (req, res, next) => {
      const token = null;
  
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userRole = decodedToken.role;
        console.log(userRole);
        if (!allowedUsers.includes(userRole)) {
          console.log(`User role ${userRole} is not allowed to access this resource` + ' allowed: ' + allowedUsers);
          return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = decodedToken.user;
        next();
      } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
      }
    };
  };

module.exports = validateToken;