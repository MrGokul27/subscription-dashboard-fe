import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Grid, Paper, Typography, Button, Box } from "@mui/material";
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

  const headerColors = {
    Starter: "linear-gradient(90deg, #895cdd, #b9a2f3ff)",
    Pro: "linear-gradient(90deg, #bb4dcf, #e4a0f2ff)",
    "Annual Pro": "linear-gradient(90deg, #895cdd, #b9a2f3ff)",
    Enterprise: "linear-gradient(90deg, #bb4dcf, #e4a0f2ff)",
  };

  return (
    <Box
      sx={{
        p: 2,
        pb: 5,
        borderRadius: 3,
        minHeight: "calc(100vh - 100px)",
        bgcolor: "#fff",
        boxShadow: 1,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        style={{ fontWeight: "500", marginBottom: "20px" }}
      >
        Available Plans
      </Typography>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-evenly"
      >
        {plans.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p._id}>
            <Paper
              style={{
                minHeight: 370,
                minWidth: 250,
                borderRadius: 10,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  background: headerColors[p.name] || "#888",
                  padding: 2,
                  borderRadius: "10px 10px 0 0",
                }}
              >
                {p.name}
              </Typography>
              <Box sx={{ padding: 2 }}>
                <Typography variant="subtitle1">
                  ${p.price} / {p.duration} days
                </Typography>
                <ul>
                  {p.features.map((f, i) => (
                    <li key={i} style={{ padding: "10px 0" }}>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="contained"
                  onClick={() => subscribe(p._id)}
                  sx={{ background: headerColors[p.name] || "#888" }}
                >
                  Subscribe
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
