import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import SupervisorCard from './SupervisorCard';

export default function AdminDashboard() {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await api.get("/api/auth/supervisors");
        setSupervisors(response.data.supervisors);
      } catch (err) {
        console.error("Failed to load supervisors", err);
      }
      setLoading(false);
    };
    fetchSupervisors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-3xl">
        Loading Supervisors...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-700 via-purple-700 to-red-600 text-white">
      <h1 className="text-5xl font-bold mb-10 text-center drop-shadow-lg">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {supervisors.map((sup) => (
          <SupervisorCard key={sup._id} supervisor={sup} nav={nav} />
        ))}
      </div>
    </div>
  );
}


