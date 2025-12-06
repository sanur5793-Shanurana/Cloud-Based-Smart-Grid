import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import SupervisorCard from './SupervisorCard';

export default function AdminDashboard() {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  // Logged-in admin info from localStorage
  const admin = JSON.parse(localStorage.getItem("user"));
  const adminState = admin?.address?.state;

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await api.get("/api/auth/supervisors");
        const allSupervisors = response.data.supervisors;

        // Filter supervisors by admin's state
        const filtered = allSupervisors.filter(
          (sup) => sup.address?.state === adminState
        );

        setSupervisors(filtered);
      } catch (err) {
        console.error("Failed to load supervisors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSupervisors();
  }, [adminState]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-700 via-purple-700 to-red-600 text-white">
      <h1 className="text-5xl font-bold mb-6 text-center drop-shadow-lg">
        Admin Dashboard
      </h1>

      {/* Show logged-in admin details */}
      <div className="bg-white/20 p-6 rounded-xl mb-10 shadow-lg text-black max-w-md mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Logged-in Admin</h2>
        <p className="text-xl">Name: {admin?.name}</p>
        <p className="text-xl">Role: {admin?.role}</p>
        <p className="text-xl">State: {adminState}</p>
        <p className="text-xl">Email: {admin?.email}</p>
      </div>

      {/* Supervisors list (filtered by admin's state) */}
      {supervisors.length === 0 ? (
        <div className="text-center text-2xl mt-20">
          No supervisors found in your state.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supervisors.map((sup) => (
            <SupervisorCard key={sup._id} supervisor={sup} nav={nav} />
          ))}
        </div>
      )}
    </div>
  );
}
