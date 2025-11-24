import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useSelector } from "react-redux";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function Sidebar() {
  const auth = useSelector((s) => s.auth);

  return (
    <aside className={styles.sidebar}>
      {auth.user && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          <DashboardIcon className={styles.icon} />
          <span>Dashboard</span>
        </NavLink>
      )}

      {auth.user?.role === "admin" && (
        <NavLink
          to="/admin/subscriptions"
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          <AdminPanelSettingsIcon className={styles.icon} />
          <span>Admin Subscriptions</span>
        </NavLink>
      )}

      <NavLink
        to="/plans"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        <PriceChangeIcon className={styles.icon} />
        <span>Plans</span>
      </NavLink>
    </aside>
  );
}
