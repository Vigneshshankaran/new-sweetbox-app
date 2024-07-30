import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, CircularProgress, Alert, Box } from '@mui/material';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import InProgressIcon from '@mui/icons-material/BuildCircle';
import CompletedIcon from '@mui/icons-material/CheckCircle';
import DeliveredIcon from '@mui/icons-material/LocalShipping';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

const Dashboard = () => {
  const [orderStats, setOrderStats] = useState({
    Pending: 0,
    Completed: 0,
    'In Progress': 0,
    Delivered: 0,
    Total: 0,
  });
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const response = await axios.get('https://sweets-admin-server-hh64.vercel.app/api/mainsweet/getStatusCounts');
        const { statusCounts, totalOrders } = response.data;
        setOrderStats(statusCounts);
        setTotalOrders(totalOrders);
      } catch (error) {
        setError('Error fetching order stats');
        console.error('Error fetching order stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStats();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const statusCards = [
    { label: 'Total', count: totalOrders, icon: <DoneOutlineIcon fontSize="large" color="primary" /> },
    { label: 'Pending', count: orderStats.Pending, icon: <PendingIcon fontSize="large" color="primary" /> },
    { label: 'In Progress', count: orderStats['In Progress'], icon: <InProgressIcon fontSize="large" color="info" /> },
    { label: 'Completed', count: orderStats.Completed, icon: <CompletedIcon fontSize="large" color="success" /> },
    { label: 'Delivered', count: orderStats.Delivered, icon: <DeliveredIcon fontSize="large" color="action" /> },
  ];

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Order Dashboard
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {statusCards.map((status) => (
          <Grid item xs={12} sm={6} md={3} key={status.label}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                {status.icon}
                <Typography variant="h6" component="h2" gutterBottom>
                  {status.label} Orders
                </Typography>
                <Typography variant="h5" component="p">
                  {status.count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
