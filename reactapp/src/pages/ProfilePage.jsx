import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <p style={{ padding: "30px" }}>Loading user info...</p>;
  }

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          height: "60px",
          backgroundColor: "#564cafff",
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Welcome, {user.name}
      </header>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            padding: "30px",
            backgroundColor: "#f0f2f5",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              maxWidth: "600px",
              width: "100%",
              textAlign: "center",
            }}
          >
            {/* User Logo */}
            <img
              src="https://i.pinimg.com/736x/ea/34/e8/ea34e8505b2296eeaf7f0677d5f9f39f.jpg"
              alt="User Logo"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                marginBottom: "20px",
                objectFit: "cover",
                border: "3px solid #42b237ff",
              }}
            />

            <h1 style={{ marginBottom: "20px", fontSize: "28px", color: "#333" }}>
              My Profile
            </h1>

            <div
              style={{
                textAlign: "left",
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                backgroundColor: "#fafafa",
              }}
            >
              <p style={{ marginBottom: "10px" }}>
                <strong>Name:</strong> {user.name}
              </p>
              <p style={{ marginBottom: "10px" }}>
                <strong>Email:</strong> {user.email}
              </p>
              <p style={{ marginBottom: "10px" }}>
                <strong>Role:</strong> {user.role}
              </p>
              <p style={{ marginBottom: "0" }}>
                <strong>User ID:</strong> {user.id}
              </p>
            </div>

            {/* Logout Button */}
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleLogout}
                style={{
                  padding: "10px 25px",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          height: "40px",
          backgroundColor: "#333",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
        }}
      >
        &copy; 2025 Your App. All rights reserved.
      </footer>
    </div>
  );
}
