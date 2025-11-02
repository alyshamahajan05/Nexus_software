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
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import LoginIcon from '@mui/icons-material/Login';

import { loginCompany, loginStudent } from '../api/auth';

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
    try {
      if (formData.role === 'company') {
        const response = await loginCompany({ email: formData.email, password: formData.password });
        const token = response?.access_token || response?.accessToken;
        if (!token) {
          throw new Error('No token received from server');
        }
        localStorage.setItem('access_token', token);
        toast.success('Logged in successfully');
        navigate('/company', { replace: true });
      } else {
        const response = await loginStudent({ email: formData.email, password: formData.password });
        const token = response?.access_token || response?.accessToken;
        if (!token) {
          throw new Error('No token received from server');
        }
        localStorage.setItem('access_token', token);
        toast.success('Logged in successfully');
        navigate('/student', { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err?.response?.data?.detail || err?.response?.data?.error || err?.message || 'Login failed';
      toast.error(String(msg));
    } finally {
      setLoading(false);
    }
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
        background: 'linear-gradient(135deg, rgba(91,108,255,0.1) 0%, rgba(124,77,255,0.1) 50%, rgba(255,107,107,0.1) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Doodles */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        {/* Top Left Doodle - Star */}
        <motion.svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            opacity: 0.3
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5B6CFF" />
              <stop offset="100%" stopColor="#7C4DFF" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Top Right Doodle - Cloud */}
        <motion.svg
          width="80"
          height="50"
          viewBox="0 0 24 16"
          fill="none"
          style={{
            position: 'absolute',
            top: '8%',
            right: '15%',
            opacity: 0.25
          }}
          animate={{
            x: [0, 10, 0],
            y: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path
            d="M20 8C20 10.2091 18.2091 12 16 12C15.8358 12 15.6738 11.9846 15.515 11.9543C15.2591 12.9428 14.3689 13.6667 13.2857 13.6667C12.2025 13.6667 11.3123 12.9428 11.0564 11.9543C10.8976 11.9846 10.7356 12 10.5714 12C8.36228 12 6.57143 10.2091 6.57143 8C6.57143 5.79086 8.36228 4 10.5714 4C10.7356 4 10.8976 4.01538 11.0564 4.04568C11.3123 3.05717 12.2025 2.33333 13.2857 2.33333C14.3689 2.33333 15.2591 3.05717 15.515 4.04568C15.6738 4.01538 15.8358 4 16 4C18.2091 4 20 5.79086 20 8Z"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
          />
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C4DFF" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Bottom Left Doodle - Arrow */}
        <motion.svg
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '8%',
            opacity: 0.3
          }}
          animate={{
            x: [0, 15, 0],
            rotate: [0, 15, -15, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="#5B6CFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>

        {/* Bottom Right Doodle - Circle Pattern */}
        <motion.svg
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            opacity: 0.2
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <circle cx="12" cy="12" r="3" stroke="#FF6B6B" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="7" stroke="#7C4DFF" strokeWidth="1.5" fill="none" />
          <circle cx="12" cy="12" r="10" stroke="#5B6CFF" strokeWidth="1" fill="none" />
        </motion.svg>

        {/* Middle Left Doodle - Heart */}
        <motion.svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            position: 'absolute',
            top: '50%',
            left: '5%',
            opacity: 0.25
          }}
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path
            d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.0621 22.0329 6.39464C21.7564 5.72718 21.351 5.12075 20.84 4.61Z"
            stroke="#FF6B6B"
            strokeWidth="2"
            fill="none"
          />
        </motion.svg>

        {/* Middle Right Doodle - Lightning */}
        <motion.svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            position: 'absolute',
            top: '45%',
            right: '8%',
            opacity: 0.3
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            stroke="#5B6CFF"
            strokeWidth="2.5"
            fill="none"
            strokeLinejoin="round"
          />
        </motion.svg>

        {/* Small decorative dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: i % 2 === 0 ? '#5B6CFF' : '#FF6B6B',
              opacity: 0.4,
              top: `${15 + i * 10}%`,
              left: `${5 + (i % 4) * 25}%`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: 'relative', zIndex: 1 }}
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                I am a:
              </Typography>
            </motion.div>
            <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
              {roleOptions.map((option, index) => (
                <motion.div
                  key={option.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
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
                      <motion.div
                        animate={formData.role === option.value ? {
                          rotate: [0, -10, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {option.icon}
                      </motion.div>
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

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Divider sx={{ my: 3 }} />
          </motion.div>

          {/* Login Form */}
          <Box component="form" onSubmit={handleLogin}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Login Details
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
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
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
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
                <motion.div
                  animate={loading ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
                  style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  <LoginIcon sx={{ mr: 1 }} />
                </motion.div>
                {loading ? 'Signing in...' : `Login as ${formData.role}`}
              </Button>
            </motion.div>
          </Box>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Typography variant="body2">Don't have an account?</Typography>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button component={Link} to="/register">Create one</Button>
              </motion.div>
            </Box>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default Login;