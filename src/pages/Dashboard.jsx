import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Container, Paper, Typography } from "@mui/material";

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

  return (
    <Container maxWidth="md" style={{ marginTop: 24 }}>
      <Typography variant="h5" gutterBottom>
        My Subscription
      </Typography>
      <Paper style={{ padding: 16 }}>
        {subscription ? (
          <>
            <Typography variant="h6">{subscription.plan.name}</Typography>
            <Typography>Price: ${subscription.plan.price}</Typography>
            <Typography>
              Start: {new Date(subscription.start_date).toLocaleString()}
            </Typography>
            <Typography>
              End: {new Date(subscription.end_date).toLocaleString()}
            </Typography>
            <Typography>Status: {subscription.status}</Typography>
          </>
        ) : (
          <Typography>No active subscription</Typography>
        )}
      </Paper>
    </Container>
  );
}
