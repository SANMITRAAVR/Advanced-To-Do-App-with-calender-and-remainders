import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  const sidebarStyle = {
    width: "220px",
    backgroundColor: "#1F3A93",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem 1rem",
    height: "100vh",
    position: "sticky",
    top: 0,
    gap: "1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    padding: "0.6rem 1rem",
    borderRadius: "5px",
    transition: "all 0.3s",
    fontWeight: "500",
  };

  const activeStyle = {
    backgroundColor: "#3D5AFE",
    color: "#fff",
  };

  const hoverStyle = {
    backgroundColor: "#4A69FF",
  };

  
  const userLinks = [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/calendar", name: "Calendar" },
    { path: "/profile", name: "Profile" },
  ];

  return (
    <aside style={sidebarStyle}>
      {user?.role === "ADMIN" ? (
        <NavLink
          to="/admin"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)
          }
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "")}
        >
          Overview
        </NavLink>
      ) : (
        <>
          {userLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              style={({ isActive }) =>
                isActive ? { ...linkStyle, ...activeStyle } : linkStyle
              }
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)
              }
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "")}
            >
              {link.name}
            </NavLink>
          ))}
        </>
      )}
    </aside>
  );
}
