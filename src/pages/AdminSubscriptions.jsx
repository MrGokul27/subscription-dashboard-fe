import React, { useEffect, useState } from "react";
import API from "../api/axios";
import {
  Container,
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
    <Container maxWidth="lg" style={{ marginTop: 24 }}>
      <Typography variant="h5" gutterBottom>
        All Subscriptions (Admin)
      </Typography>
      <Paper style={{ padding: 16 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subs.map((s) => (
              <TableRow key={s._id}>
                <TableCell>
                  {s.user?.name} ({s.user?.email})
                </TableCell>
                <TableCell>{s.plan?.name}</TableCell>
                <TableCell>{new Date(s.start_date).toLocaleString()}</TableCell>
                <TableCell>{new Date(s.end_date).toLocaleString()}</TableCell>
                <TableCell>{s.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
