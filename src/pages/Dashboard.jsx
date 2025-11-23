import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Box, Paper, Grid, Typography } from "@mui/material";

export default function Dashboard() {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/my-subscription");
        setSubscription(res.data.subscription);
      } catch (err) {
        alert("Failed to load subscription");
      }
    };
    fetch();
  }, []);

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
        My Subscription
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            style={{
              minHeight: 270,
              minWidth: 250,
              borderRadius: 10,
            }}
          >
            {subscription ? (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#fff",
                    background: headerColors[subscription.plan.name] || "#888",
                    padding: 2,
                    borderRadius: "10px 10px 0 0",
                  }}
                >
                  {subscription.plan.name}
                </Typography>
                <Box sx={{ padding: 2 }}>
                  <Typography variant="h6">{subscription.plan.name}</Typography>
                  <Typography>Price: ${subscription.plan.price}</Typography>
                  <Typography>
                    Start: {new Date(subscription.start_date).toLocaleString()}
                  </Typography>
                  <Typography>
                    End: {new Date(subscription.end_date).toLocaleString()}
                  </Typography>
                  <Typography>Status: {subscription.status}</Typography>
                </Box>
              </>
            ) : (
              <Typography sx={{ padding: 2, textAlign: "center" }}>
                No active subscription
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
