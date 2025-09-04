import React from "react";

export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        padding: "1rem 2rem",
        backgroundColor: "#3D5AFE",
        color: "#fff",
        fontSize: "1.2rem",
        fontWeight: "bold",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      Task Manager Dashboard
    </header>
  );
}
