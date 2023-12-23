import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateCity from './Components/City/createCity';
import EditCity from './Components/City/editCity';
import ViewCity from './Components/City/viewCity';
import CityList from './Components/City/cityList';
import App from './App';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create" element={<CreateCity />} />
      <Route path="/create-city" element={<CreateCity />} />
      <Route path="/edit-city/:id" element={<EditCity />} />
      <Route path="/view-city/:id" element={<ViewCity />} />
      <Route path="/city-list" element={<CityList />} />
    </Routes>
  </Router>
);
