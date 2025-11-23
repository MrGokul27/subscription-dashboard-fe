import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const auth = useSelector((s) => s.auth);
  return (
    <aside className={styles.sidebar}>
      <NavLink
        to="/plans"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        Plans
      </NavLink>
      {auth.user && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Dashboard
        </NavLink>
      )}
      {auth.user?.role === "admin" && (
        <NavLink
          to="/admin/subscriptions"
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Admin Subscriptions
        </NavLink>
      )}
    </aside>
  );
}
