// src/pages/Login.jsx
import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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

      // ---- FIXED ROLE ROUTES ----
      switch (role) {
        case "admin":
          nav("/admin");
          break;

        case "supervisor":
          // FIX: supervisor dashboard URL
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-600 via-blue-600 to-purple-700 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl text-white animate-slideIn"
      >
        <h2 className="text-3xl font-bold text-center mb-6 drop-shadow-lg">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-500/80 p-3 mb-4 rounded-md text-white font-medium text-center">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handle}
            placeholder="example@email.com"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/30 focus:ring-2 
                       focus:ring-purple-400 outline-none placeholder-white/70 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handle}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/30 focus:ring-2 
                      focus:ring-blue-400 outline-none placeholder-white/70 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-bold rounded-xl bg-gradient-to-r 
                    from-purple-500 to-pink-500 hover:brightness-110 
                    active:scale-95 transition shadow-lg text-white"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-white/70 mt-4">
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
