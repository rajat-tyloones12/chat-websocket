// src/components/Login.js
import React from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Grid } from '@mui/material';

function Login({ name, setName, connect }) {
  return (
    <Box sx={{ height: '100vh', background: 'linear-gradient(to right, #1976d2, #d32f2f)' }}>
      <Container maxWidth="md" sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <Paper elevation={6} sx={{ padding: 4, width: '100%' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h3" component="h1" gutterBottom>
                  Welcome to ChatApp
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Connect with your friends and family
                </Typography>
                <TextField
                  label="Enter your name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={connect}
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Connect
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <img
                  src="https://source.unsplash.com/random/800x600"
                  alt="Chat Illustration"
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
