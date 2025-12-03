// src/pages/Signup.jsx
import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/api/auth/signup", form);
      console.log("Signup response:", res.data);
      nav("/login");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-700 via-pink-600 to-yellow-500 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl text-white animate-slideIn"
      >
        <h2 className="text-3xl font-bold text-center mb-6 drop-shadow-lg">Create Account</h2>

        {error && (
          <div className="bg-red-500/80 p-3 mb-4 rounded-md text-white font-medium text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handle}
            placeholder="John Doe"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/30 focus:ring-2 focus:ring-pink-400 outline-none placeholder-white/70 transition"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handle}
            placeholder="example@email.com"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/30 focus:ring-2 focus:ring-purple-400 outline-none placeholder-white/70 transition"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handle}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/30 focus:ring-2 focus:ring-blue-400 outline-none placeholder-white/70 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handle}
            className="w-full px-4 py-3 rounded-xl bg-white/30 focus:ring-2 focus:ring-green-400 outline-none transition"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="supervisor">Supervisor</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-bold rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 hover:brightness-110 active:scale-95 transition shadow-lg text-white"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-white/70 mt-4">
          Already have an account?{" "}
          <span className="text-yellow-300 cursor-pointer hover:underline" onClick={() => nav("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
