import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

import { App } from './components/App';
import { Home } from './components/Home';
import Reservation from './components/Reservation';
import './style.css';

export const API_BASE_URL = 'http://leviexpress-backend.herokuapp.com/api';

createRoot(document.querySelector('#app')).render(<App />);
