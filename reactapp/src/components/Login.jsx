import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", role: "USER" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const success = await login(form.email, form.password, form.role);
      if (success) {
        navigate(form.role === "ADMIN" ? "/admin" : "/dashboard");
      }
    } catch (e2) {
      setErr(e2.message || "Login failed");
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
          "url('https://i.pinimg.com/1200x/ac/54/a1/ac54a128942c750799c2c1fe144d2467.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "30px",
          borderRadius: "15px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <img
          src="https://i.pinimg.com/1200x/f3/7d/ce/f37dce61c50136e8f7ee1f5fc46d47db.jpg"
          alt="Tasky Logo"
          style={{ width: "100px", height: "100px", marginBottom: "15px" }}
        />

        {/* App Name */}
        <h1 style={{ fontSize: "2rem", marginBottom: "10px", color: "#3D5AFE" }}>Tasky</h1>

        {/* Tagline / Interesting Lines */}
        <p style={{ fontSize: "1rem", marginBottom: "25px", lineHeight: "1.5", color: "#333" }}>
          "Organize your tasks." <br />
          "Boost your productivity." <br />
          "Achieve your goals, one task at a time!"
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          {err && (
            <div style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
              {err}
            </div>
          )}

          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
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
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Role */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Login
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
}
