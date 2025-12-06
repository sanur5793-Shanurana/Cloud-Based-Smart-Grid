// src/pages/Login.jsx
import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/auth/login", form);

      // store user + token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const { role, _id } = res.data.user;

      // ============================
      //  ROLE MUST MATCH VALIDATION
      // ============================
      if (form.role !== role) {
        setError(
          `Selected role (${form.role}) does NOT match your account role (${role}).`
        );
        setLoading(false);
        return;
      }

      // ---- ROLE ROUTING ----
      switch (role) {
        case "admin":
          nav("/admin");
          break;

        case "supervisor":
          nav(`/supervisor-dashboard/${_id}`);
          break;

        case "user":
          nav("/dashboard");
          break;

        default:
          setError("Invalid role assigned. Contact Admin.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-700 to-pink-600 p-6">

      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 
                   rounded-3xl p-10 shadow-2xl text-white animate-fadeIn"
      >
        <h2 className="text-4xl font-extrabold text-center mb-8 drop-shadow-lg">Login</h2>

        {error && (
          <div className="bg-red-500/80 p-3 mb-5 rounded-lg text-center font-semibold shadow-lg">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block mb-1 font-semibold text-white">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handle}
            required
            placeholder="example@gmail.com"
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/40
                      outline-none placeholder-white/70 focus:ring-2 focus:ring-purple-300 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold text-white">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handle}
            required
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/40
                      outline-none placeholder-white/70 focus:ring-2 focus:ring-blue-300 transition"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-1 font-semibold text-white">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handle}
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/40
                      outline-none focus:ring-2 focus:ring-green-300 transition"
          >
            <option value="user" className="text-black">User</option>
            <option value="admin" className="text-black">Admin</option>
            <option value="supervisor" className="text-black">Supervisor</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-bold rounded-xl bg-gradient-to-r 
                    from-indigo-500 to-pink-500 hover:brightness-110 
                    active:scale-95 transition shadow-lg text-white"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-white/70 mt-6">
          Don’t have an account?{" "}
          <span
            className="text-yellow-300 cursor-pointer hover:underline"
            onClick={() => nav("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
