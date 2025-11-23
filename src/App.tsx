import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Plans from "./pages/Plans";
import Dashboard from "./pages/Dashboard";
import AdminSubscriptions from "./pages/AdminSubscriptions";
import ProtectedRoute from "./components/ProtectedRoute";
import API from "./api/axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "./store/slices/authSlice";
import styles from "./styles/layout.module.css";

export default function App() {
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.auth);

  // Auto refresh token on first load
  useEffect(() => {
    const restoreSession = async () => {
      if (accessToken && user) return;

      try {
        const res = await API.post("/auth/refresh");
        dispatch(
          setCredentials({
            user: res.data.user,
            accessToken: res.data.accessToken,
          })
        );
      } catch {
        dispatch(logout());
      }
    };

    restoreSession();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Navigate to="/plans" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/plans" element={<Plans />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route
                path="/admin/subscriptions"
                element={<AdminSubscriptions />}
              />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}
