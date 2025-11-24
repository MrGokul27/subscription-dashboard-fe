import React, { useEffect, useState } from "react";
import API from "../api/axios";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function AdminSubscriptions() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/admin/subscriptions");
        setSubs(res.data.subscriptions);
      } catch (err) {
        alert("Failed to load subscriptions. Are you logged in as admin?");
      }
    };
    fetch();
  }, []);

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
        All Subscriptions (Admin)
      </Typography>
      <Paper>
        <Table>
          <TableHead sx={{ backgroundColor: "#e9eff6ff" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subs.map((s) => (
              <TableRow key={s._id}>
                <TableCell>{s.user?.name}</TableCell>
                <TableCell>{s.user?.email}</TableCell>
                <TableCell>{s.plan?.name}</TableCell>
                <TableCell>{new Date(s.start_date).toLocaleString()}</TableCell>
                <TableCell>{new Date(s.end_date).toLocaleString()}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      padding: "10px 0px",
                      backgroundColor:
                        s.status === "active" ? "#c6ff97" : "#f2ab9aff",
                      borderRadius: "20px",
                      textAlign: "center",
                    }}
                  >
                    {s.status}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
