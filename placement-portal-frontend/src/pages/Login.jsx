import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import LoginIcon from '@mui/icons-material/Login';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'company'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login API call
    setTimeout(() => {
      setLoading(false);
      toast.success(`Welcome! Logging in as ${formData.role}...`);
      
      if (formData.role === 'company') {
        navigate('/company');
      } else {
        navigate('/student');
      }
    }, 1500);
  };

  const roleOptions = [
    {
      value: 'company',
      label: 'Company',
      description: 'Post jobs and manage candidates',
      icon: <BusinessIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: 'linear-gradient(135deg, #5B6CFF 0%, #7C4DFF 100%)'
    },
    {
      value: 'student',
      label: 'Student',
      description: 'Find jobs and apply to positions',
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      color: 'linear-gradient(135deg, #7C4DFF 0%, #FF6B6B 100%)'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        background: 'linear-gradient(135deg, rgba(91,108,255,0.1) 0%, rgba(124,77,255,0.1) 50%, rgba(255,107,107,0.1) 100%)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            maxWidth: 500,
            width: '100%',
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #5B6CFF 0%, #7C4DFF 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}
              >
                Placement Portal
              </Typography>
            </motion.div>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
              Choose your role to continue
            </Typography>
          </Box>

          {/* Role Selection */}
          <Box mb={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              I am a:
            </Typography>
            <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
              {roleOptions.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    sx={{
                      flex: 1,
                      cursor: 'pointer',
                      border: formData.role === option.value ? 2 : 1,
                      borderColor: formData.role === option.value ? 'primary.main' : 'divider',
                      background: formData.role === option.value 
                        ? 'linear-gradient(135deg, rgba(91,108,255,0.1) 0%, rgba(124,77,255,0.1) 100%)'
                        : 'transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                        boxShadow: 4
                      }
                    }}
                    onClick={() => setFormData({ ...formData, role: option.value })}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      {option.icon}
                      <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
                        {option.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Login Form */}
          <Box component="form" onSubmit={handleLogin}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Login Details
            </Typography>
            
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
              placeholder="Enter your email address"
            />
            
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              sx={{ mb: 3 }}
              placeholder="Enter your password"
            />

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  background: formData.role === 'company' 
                    ? 'linear-gradient(135deg, #5B6CFF 0%, #7C4DFF 100%)'
                    : 'linear-gradient(135deg, #7C4DFF 0%, #FF6B6B 100%)',
                  '&:hover': {
                    background: formData.role === 'company'
                      ? 'linear-gradient(135deg, #4A5BFF 0%, #6B3DFF 100%)'
                      : 'linear-gradient(135deg, #6B3DFF 0%, #FF5252 100%)',
                  },
                  '&:disabled': {
                    background: 'grey.300'
                  }
                }}
              >
                <LoginIcon sx={{ mr: 1 }} />
                {loading ? 'Signing in...' : `Login as ${formData.role}`}
              </Button>
            </motion.div>
          </Box>

          {/* Demo Credentials */}
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>Demo:</strong> Use any email/password to login. The system will redirect you based on your selected role.
            </Typography>
          </Alert>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default Login;