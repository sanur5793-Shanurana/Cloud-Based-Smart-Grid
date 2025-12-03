import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // Not logged in → go to login
    if (!storedUser) {
      nav("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // Logged in BUT role is not "user"
    if (parsedUser.role !== "user") {
      setShowPopup(true);   // show invalid role popup
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        nav("/login");
      }, 2000); // auto redirect after 2 sec
    }

  }, [nav]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-purple-700 via-pink-600 to-yellow-500 p-4">
      
      {/* ❗ Invalid Role Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white text-black p-6 rounded-2xl shadow-2xl max-w-sm text-center animate-fadeIn">
            <h2 className="text-xl font-bold mb-3">Access Denied</h2>
            <p className="text-gray-700 font-medium">
              You are not authorized to access the User Dashboard.
            </p>
          </div>
        </div>
      )}

      {/* Dashboard only for valid user role */}
      {!showPopup && (
        <div className="w-full max-w-3xl bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 p-8 text-white shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-8 drop-shadow-lg">User Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 p-6 rounded-xl shadow-lg flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2">User ID</h3>
              <p className="text-lg font-medium">{user._id}</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl shadow-lg flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2">Name</h3>
              <p className="text-lg font-medium">{user.name}</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl flex flex-col items-center shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-lg font-medium">{user.email}</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl flex flex-col items-center shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Role</h3>
              <p className="text-lg font-medium">{user.role}</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                nav("/login");
              }}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-bold hover:brightness-110 transition shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
