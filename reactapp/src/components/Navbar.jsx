import React from "react";

export default function Navbar({ children }) {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "#3D5AFE",
      color: "#fff",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}>
      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Admin Dashboard</div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {children} {/*  */}
      </div>
    </nav>
  );
}
