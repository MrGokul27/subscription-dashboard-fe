import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const auth = useSelector((s) => s.auth);
  const nav = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/plans");
        setPlans(res.data);
      } catch (err) {
        alert("Failed to load plans");
      }
    };
    fetch();
  }, []);

  const subscribe = async (planId) => {
    if (!auth.user) {
      nav("/login");
      return;
    }
    try {
      await API.post(`/subscribe/${planId}`);
      alert("Subscribed successfully");
      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Subscribe failed");
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: 24 }}>
      <Typography variant="h5" gutterBottom>
        Available Plans
      </Typography>
      <Grid container spacing={2}>
        {plans.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p._id}>
            <Paper style={{ padding: 16 }}>
              <Typography variant="h6">{p.name}</Typography>
              <Typography variant="subtitle1">
                ${p.price} / {p.duration} days
              </Typography>
              <ul>
                {p.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <Button variant="contained" onClick={() => subscribe(p._id)}>
                Subscribe
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
