import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import { Navigate } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import SupervisorDashboard from "./components/SupervisorDashboard";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/supervisor/:id" element={<SupervisorDashboard />} />
          <Route path="/supervisor-dashboard/:id" element={<SupervisorDashboard />} />          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
