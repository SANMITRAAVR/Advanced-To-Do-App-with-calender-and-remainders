// src/pages/DashboardAdmin.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import * as api from "../api";

export default function DashboardAdmin() {
  const { logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [tasksMap, setTasksMap] = useState({}); 

  const loadUsersAndTasks = async () => {
    try {
      const usersRes = await api.getUsers();
      setUsers(usersRes.data);

      const tasksData = {};
      for (const u of usersRes.data) {
        const tRes = await api.getTasks(u.id);
        tasksData[u.id] = tRes.data;
      }
      setTasksMap(tasksData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      
      const userTasks = tasksMap[userId] || [];
      for (const t of userTasks) {
        await api.deleteTask(userId, t.id);
      }
      
      await api.deleteUser?.(userId); 
      await loadUsersAndTasks();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsersAndTasks();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar>
        <button 
          onClick={logout} 
          style={{
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </Navbar>

      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />

        <main style={{ flex: 1, padding: "2rem", backgroundColor: "#f5f7ff" }}>
          {/* */}

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {users.length ? users.map(u => (
              <div key={u.id} style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "1rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong>{u.name}</strong> <span style={{
                      backgroundColor: "#536DFE",
                      color: "#fff",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "5px"
                    }}>{u.role}</span>
                    <div style={{ fontSize: "0.85rem", color: "#666" }}>{u.email}</div>
                  </div>
                  <button 
                    onClick={() => handleDeleteUser(u.id)} 
                    style={{
                      padding: "0.3rem 0.7rem",
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor: "#f44336",
                      color: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    Delete User
                  </button>
                </div>

                {/* User Tasks */}
                <h4 style={{ marginTop: "1rem", color: "#3D5AFE" }}>Tasks:</h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {(tasksMap[u.id] || []).map(t => (
                    <li key={t.id} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem",
                      borderBottom: "1px solid #eee",
                      borderRadius: "5px",
                      marginBottom: "0.5rem"
                    }}>
                      <div>
                        <strong>{t.title}</strong>{" "}
                        <span style={{
                          backgroundColor: "#536DFE",
                          color: "#fff",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "5px"
                        }}>{t.priority}</span>
                        <div style={{ fontSize: "0.85rem", color: "#666" }}>
                          Due: {t.deadline || "—"} | Status: {t.status}
                        </div>
                      </div>
                      <button 
                        onClick={async () => {
                          await api.deleteTask(u.id, t.id);
                          loadUsersAndTasks();
                        }}
                        style={{
                          padding: "0.3rem 0.7rem",
                          borderRadius: "5px",
                          border: "none",
                          backgroundColor: "#f44336",
                          color: "#fff",
                          cursor: "pointer"
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                  {!tasksMap[u.id]?.length && <div style={{ color: "#999" }}>No tasks</div>}
                </ul>
              </div>
            )) : <div style={{ color: "#999" }}>No users</div>}
          </div>
        </main>
      </div>

      {/* Footer */}
        <div
          style={{
            marginTop: "2rem",
            textAlign: "center",
            padding: "1rem",
            backgroundColor: "#3D5AFE",
            color: "#fff",
            borderRadius: "10px",
          }}
        >
          © {new Date().getFullYear()} Task Manager | Built with ❤️
        </div>
    </div>
  );
}
