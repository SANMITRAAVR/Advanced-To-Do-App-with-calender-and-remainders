import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { ReminderProvider } from "./context/ReminderContext.jsx"; 
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import DashboardUser from "./pages/DashboardUser.jsx";
import DashboardAdmin from "./pages/DashboardAdmin.jsx";
import CalendarPage from "./components/CalendarPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Footer from "./components/Footer.jsx";

function PrivateRoute({ children, roles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />; 
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />; 

  return children;
}

function App() {
  return (
    <AuthProvider>
      <ReminderProvider> {/* */}
        <Router>
          <AppRoutes />
        </Router>
      </ReminderProvider>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={["USER"]}>
                <DashboardUser />
              </PrivateRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <DashboardAdmin />
              </PrivateRoute>
            }
          />

          {/* Calendar Page */}
          <Route
            path="/calendar"
            element={
              <PrivateRoute roles={["USER", "ADMIN"]}>
                <CalendarPage />
              </PrivateRoute>
            }
          />

          {/* Profile Page */}
          <Route
            path="/profile"
            element={
              <PrivateRoute roles={["USER", "ADMIN"]}>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Default redirect */}
          <Route
            path="/"
            element={
              user ? (
                <Navigate to={user.role === "ADMIN" ? "/admin" : "/dashboard"} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>

      {/* Footer: only show if logged in */}
      {user && <Footer />}
    </div>
  );
}

export default App;
