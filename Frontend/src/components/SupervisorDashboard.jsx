import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SupervisorDashboard() {
  const nav = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const [supervisor, setSupervisor] = useState(state || null);
  const [loading, setLoading] = useState(!state);
  const [error, setError] = useState("");

  // Load supervisor if no state or refresh
  useEffect(() => {
    if (!state && id) {
      fetchSupervisor();
    }
  }, [id]);

  const fetchSupervisor = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/supervisor/${id}`
      );
      setSupervisor(res.data.supervisor);
    } catch (err) {
      console.error(err);
      setError("Failed to load supervisor details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-3xl">
        Loading supervisor dashboard...
      </div>
    );

  if (error || !supervisor)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        {error || "Supervisor data not found!"}
        <button
          className="ml-4 px-4 py-2 bg-white/20 rounded-xl"
          onClick={() => nav("/admin")}
        >
          Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-10 text-white">
      <div className="max-w-3xl mx-auto bg-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-6">
          Supervisor Dashboard
        </h1>

        {/* Supervisor Details Section */}
        <div className="space-y-4 text-xl">

          <p>
            <b>Name:</b> {supervisor.name}
          </p>

          <p>
            <b>Email:</b> {supervisor.email}
          </p>

          <p>
            <b>Phone:</b> {supervisor.phone}
          </p>

          <p>
            <b>Role:</b> {supervisor.role}
          </p>

          <p>
            <b>ID:</b> {supervisor._id}
          </p>

          <p>
            <b>City / Village:</b> {supervisor.address?.cityOrVillage}
          </p>

          <p>
            <b>Area:</b> {supervisor.address?.area}
          </p>

          <p>
            <b>Created At:</b>{" "}
            {supervisor.createdAt
              ? new Date(supervisor.createdAt).toLocaleString()
              : "N/A"}
          </p>

        </div>

        <button
          onClick={() => nav("/admin")}
          className="mt-8 w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white font-bold hover:brightness-110"
        >
          Back
        </button>

      </div>
    </div>
  );
}
