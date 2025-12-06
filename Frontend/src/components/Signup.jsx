// src/pages/Signup.jsx
import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    phone: "",
    state: "",
    cityOrVillage: "",
    area: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.phone.length !== 10) {
      setError("Phone number must be 10 digits");
      setLoading(false);
      return;
    }

    try {
      const formattedData = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        phone: form.phone,
        address: {
          state: form.state,
          cityOrVillage: form.cityOrVillage,
          area: form.area,
        },
      };

      await api.post("/api/auth/signup", formattedData);
      nav("/login");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1f] p-4 relative overflow-hidden">

      <div className="absolute w-72 h-72 bg-purple-600/30 rounded-full blur-3xl top-10 left-10 animate-pulse" />
      <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-2xl bottom-10 right-10 animate-ping" />

      <form
        onSubmit={submit}
        className="w-full max-w-lg bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl
                  rounded-3xl p-10 text-white relative z-10 animate-fadeSlide"
      >
        <h2 className="text-4xl font-extrabold text-center mb-8 tracking-wide">
          Create <span className="text-purple-300">Account</span>
        </h2>

        {error && (
          <div className="bg-red-600/80 p-3 mb-4 rounded-lg text-white font-medium text-center shadow-md">
            {error}
          </div>
        )}

        <InputField label="Full Name" name="name" value={form.name} onChange={handle} placeholder="John Doe" />

        <InputField label="Email" name="email" type="email" value={form.email} onChange={handle} placeholder="example@mail.com" />

        {/* PASSWORD NOW AFTER EMAIL */}
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handle}
          placeholder="••••••••"
        />

        <InputField label="Phone Number" name="phone" type="number" value={form.phone} onChange={handle} placeholder="10-digit phone number" />

        {/* STATE NOW BEFORE CITY */}
        <InputField
          label="State / Province"
          name="state"
          value={form.state}
          onChange={handle}
          placeholder="Punjab / Haryana / Uttar Pradesh..."
        />

        <InputField
          label="City / Village"
          name="cityOrVillage"
          value={form.cityOrVillage}
          onChange={handle}
          placeholder="Chandigarh, Rampur Village..."
        />

        <InputField
          label="Area (Sector/Ward/Mohalla)"
          name="area"
          value={form.area}
          onChange={handle}
          placeholder="Sector 22 / Ward 5 / Mohalla XYZ"
        />

        <div className="mb-5">
          <label className="text-lg font-semibold">Select Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handle}
            className="mt-2 w-full px-4 py-3 rounded-xl bg-white/20 text-white outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="user" className="text-black">User</option>
            <option value="admin" className="text-black">Admin</option>
            <option value="supervisor" className="text-black">Supervisor</option>
            <option value="areaHead" className="text-black">Area Head</option>
          </select>
        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-4 font-bold tracking-wide rounded-xl bg-gradient-to-r 
                    from-purple-500 to-blue-500 hover:brightness-110 active:scale-95 
                    transition-all shadow-lg shadow-purple-500/30"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-white/70 mt-5">
          Already have an account?{" "}
          <span onClick={() => nav("/login")} className="text-purple-300 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
function InputField({ label, name, value, onChange, type = "text", placeholder }) {
  return (
    <div className="mb-5">
      <label className="text-lg font-semibold">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="mt-2 w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 
                  outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
    </div>
  );
}
