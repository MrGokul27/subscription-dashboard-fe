import React from "react";
import styles from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../../store/slices/authSlice";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  Button,
  Box,
} from "@mui/material";

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
        <Typography variant="h5">Subscription Dashboard</Typography>
      </div>
      <div className={styles.actions}>
        {auth.user ? (
          <>
            <Avatar sx={{ width: 35, height: 35 }} />
            <Typography
              variant="h7"
              sx={{
                color: "#fff",
                padding: 2,
                paddingLeft: 0,
                borderRadius: "10px 10px 0 0",
              }}
            >
              {auth.user.name}
            </Typography>
            <Button
              variant="contained"
              onClick={logout}
              sx={{ backgroundColor: "#fff", color: "#000" }}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={() => nav("/login")}
              sx={{ backgroundColor: "#fff", color: "#000" }}
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => nav("/register")}
              sx={{ backgroundColor: "#fff", color: "#000" }}
              startIcon={<PersonAddIcon />}
            >
              Register
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
