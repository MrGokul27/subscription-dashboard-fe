import React, { useState } from "react";
import API from "../api/axios";
import { useDispatch } from "react-redux";
import { setCredentials, setError } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Paper, Typography } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      dispatch(
        setCredentials({
          user: res.data.user,
          accessToken: res.data.accessToken,
        })
      );
      nav("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      dispatch(setError(msg));
      alert(msg);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 32 }}>
      <Paper style={{ padding: 24 }}>
        <Typography variant="h6">Login</Typography>
        <form
          onSubmit={submit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 12,
          }}
        >
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
