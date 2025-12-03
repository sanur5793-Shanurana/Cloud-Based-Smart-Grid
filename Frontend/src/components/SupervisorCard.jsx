import React, { useState } from "react";

export default function SupervisorCard({ supervisor, nav }) {
  const [expanded, setExpanded] = useState(false);

  if (!supervisor) {
    return (
      <div className="bg-red-500/20 p-4 rounded-xl text-white text-center">
        Invalid Supervisor Data
      </div>
    );
  }

  return (
    <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{supervisor.name}</h2>

        <button
          onClick={() => setExpanded(!expanded)}
          className="px-4 py-1 bg-black/30 text-white rounded-lg hover:bg-black/50 transition text-sm"
        >
          {expanded ? "Minimize" : "Expand"}
        </button>
      </div>

      {/* Basic Details */}
      <p className="text-white/80"><b>Email:</b> {supervisor.email}</p>
      <p className="text-white/80"><b>Role:</b> {supervisor.role}</p>

      {/* Expand Section */}
      <div
        className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-60 mt-4" : "max-h-0"
          }`}
      >
        <div className="p-4 bg-black/20 rounded-xl border border-white/20">
          <p className="text-lg mb-2 text-white font-semibold">More Details:</p>

          <p className="text-white/80">ID: {supervisor._id}</p>

          <p className="text-white/80">
            Created:{" "}
            {supervisor.createdAt
              ? new Date(supervisor.createdAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Open Dashboard Button */}
      <button
        onClick={() =>
          supervisor._id
            ? nav(`/supervisor/${supervisor._id}`, { state: supervisor })
            : alert("Invalid Supervisor ID")
        }
        className="mt-5 w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg font-bold hover:brightness-110 transition shadow-lg text-white"
      >
        Open Dashboard
      </button>

    </div>
  );
}
