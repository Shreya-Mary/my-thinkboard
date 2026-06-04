import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx' // 1. Import the provider
import axios from "axios";

// Automatically attach the user token to every single outbound request
axios.interceptors.request.use((config) => {
    const storedUser = localStorage.getItem("thinkboard_user");
    if (storedUser) {
        const { token } = JSON.parse(storedUser);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* 2. Wrap your app components */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)