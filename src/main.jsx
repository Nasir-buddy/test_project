import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import App from "./App";
import './index.css'
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
