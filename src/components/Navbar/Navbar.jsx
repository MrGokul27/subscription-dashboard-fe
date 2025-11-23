import React from "react";
import styles from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../../store/slices/authSlice";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const auth = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch {}
    dispatch(logoutAction());
    nav("/login");
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <div
          style={{ width: 36, height: 36, borderRadius: 8, background: "#fff" }}
        />
        <div>Subscription Dashboard</div>
      </div>
      <div className={styles.actions}>
        {auth.user ? (
          <>
            <div>
              {auth.user.name} ({auth.user.role})
            </div>
            <button className={styles.button} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className={styles.button} onClick={() => nav("/login")}>
              Login
            </button>
            <button className={styles.button} onClick={() => nav("/register")}>
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}
