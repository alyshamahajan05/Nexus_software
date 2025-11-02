import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { registerCompany, registerStudent } from '../api/auth';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Register() {
  const [role, setRole] = useState('company');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (role === 'company') {
        await registerCompany(formData);
      } else {
        await registerStudent(formData);
      }
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      const msg = err?.response?.data?.detail || err?.response?.data?.error || 'Registration failed';
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
        {/* Top Left Doodle - Rocket */}
        <motion.svg
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            position: 'absolute',
            top: '12%',
            left: '12%',
            opacity: 0.3
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path
            d="M12 2L16 8L22 9L16 14L18 20L12 17L6 20L8 14L2 9L8 8L12 2Z"
            stroke="#5B6CFF"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="12" cy="12" r="2" fill="#FF6B6B" />
        </motion.svg>

        {/* Top Right Doodle - Sparkle */}
        <motion.svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            position: 'absolute',
            top: '10%',
            right: '12%',
            opacity: 0.25
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <path
            d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
            stroke="url(#gradient3)"
            strokeWidth="2"
            fill="none"
          />
          <defs>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C4DFF" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Bottom Left Doodle - Checkmark */}
        <motion.svg
          width="65"
          height="65"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            position: 'absolute',
            bottom: '18%',
            left: '10%',
            opacity: 0.3
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path
            d="M20 6L9 17L4 12"
            stroke="#7C4DFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>

        {/* Bottom Right Doodle - Triangle Pattern */}
        <motion.svg
          width="90"
          height="90"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            position: 'absolute',
            bottom: '12%',
            right: '8%',
            opacity: 0.2
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <path
            d="M12 2L22 20H2L12 2Z"
            stroke="#5B6CFF"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M12 8L17 16H7L12 8Z"
            stroke="#FF6B6B"
            strokeWidth="1.5"
            fill="none"
          />
        </motion.svg>

        {/* Middle Left Doodle - Star Burst */}
        <motion.svg
          width="55"
          height="55"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            position: 'absolute',
            top: '48%',
            left: '6%',
            opacity: 0.25
          }}
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <path
            d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z"
            stroke="#FF6B6B"
            strokeWidth="2"
            fill="none"
          />
        </motion.svg>

        {/* Middle Right Doodle - Zigzag */}
        <motion.svg
          width="70"
          height="50"
          viewBox="0 0 24 16"
          fill="none"
          style={{
            position: 'absolute',
            top: '50%',
            right: '10%',
            opacity: 0.3
          }}
          animate={{
            x: [0, 10, 0],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path
            d="M2 8L8 2L14 8L20 2"
            stroke="#5B6CFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>

        {/* Small decorative dots */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: i % 3 === 0 ? '#5B6CFF' : i % 3 === 1 ? '#7C4DFF' : '#FF6B6B',
              opacity: 0.4,
              top: `${12 + i * 8}%`,
              left: `${3 + (i % 5) * 23}%`
            }}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 2.5 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15
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
              Create your account
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
                Register as:
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
                      border: role === option.value ? 2 : 1,
                      borderColor: role === option.value ? 'primary.main' : 'divider',
                      background: role === option.value 
                        ? 'linear-gradient(135deg, rgba(91,108,255,0.1) 0%, rgba(124,77,255,0.1) 100%)'
                        : 'transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                        boxShadow: 4
                      }
                    }}
                    onClick={() => setRole(option.value)}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <motion.div
                        animate={role === option.value ? {
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

          {/* Registration Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Account Details
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <TextField
                fullWidth
                label={role === 'company' ? 'Company Name' : 'Full Name'}
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
                placeholder={role === 'company' ? 'Enter your company name' : 'Enter your full name'}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
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
              transition={{ duration: 0.4, delay: 1.0 }}
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
              transition={{ duration: 0.5, delay: 1.1 }}
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
                  background: role === 'company' 
                    ? 'linear-gradient(135deg, #5B6CFF 0%, #7C4DFF 100%)'
                    : 'linear-gradient(135deg, #7C4DFF 0%, #FF6B6B 100%)',
                  '&:hover': {
                    background: role === 'company'
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
                  <PersonAddIcon sx={{ mr: 1 }} />
                </motion.div>
                {loading ? 'Creating account...' : `Register as ${role}`}
              </Button>
            </motion.div>
          </Box>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Typography variant="body2">Already have an account?</Typography>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button component={Link} to="/login">Login</Button>
              </motion.div>
            </Box>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default Register;



