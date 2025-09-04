import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "USER" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const success = await signup(form);
      if (success) {
        
        navigate(form.role === "ADMIN" ? "/admin" : "/dashboard");
      }
    } catch (e2) {
      setErr(e2.message || "Signup failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://i.pinimg.com/736x/12/a3/a4/12a3a43cf1220bdc4d975baf73643db3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "30px",
          borderRadius: "10px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Create Account</h1>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          {err && (
            <div style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
              {err}
            </div>
          )}

          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }}
            />
          </div>

          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }}
            />
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }}
            />
          </div>

          {/* Role */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <button
            type="submit"
            style={{ padding: "10px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}
          >
            Sign up
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
