// src/pages/StudentDashboard.jsx
import React from 'react';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// Icons
import StatWidget from '../components/statwidget';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InsightsIcon from '@mui/icons-material/Insights';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ScannerIcon from '@mui/icons-material/Scanner';
import PersonIcon from '@mui/icons-material/Person';
import RecommendIcon from '@mui/icons-material/Recommend';

// Components
import ATSScannerCard from '../components/ATSScannerCard';

// Mock Data for Student Dashboard
const mockStats = [
  { 
    title: 'Applications Sent', 
    value: 8, 
    trend: '+2 this week', 
    IconComponent: AssignmentIcon, 
    trendType: 'up' 
  },
  { 
    title: 'Job Matches', 
    value: 24, 
    trend: 'Based on profile', 
    IconComponent: WorkIcon, 
    trendType: 'neutral' 
  },
  { 
    title: 'ATS Score', 
    value: '78%', 
    trend: 'Good standing', 
    IconComponent: InsightsIcon, 
    trendType: 'up' 
  },
  { 
    title: 'Profile Views', 
    value: 45, 
    trend: 'Last 30 days', 
    IconComponent: TrendingUpIcon, 
    trendType: 'up' 
  },
];

const mockRecommendedJobs = [
  { 
    title: 'Software Engineer Intern', 
    company: 'TechCorp', 
    match: 92, 
    location: 'Remote',
    type: 'Internship'
  },
  { 
    title: 'Frontend Developer', 
    company: 'StartupXYZ', 
    match: 88, 
    location: 'Bangalore',
    type: 'Full-time'
  },
  { 
    title: 'Data Analyst', 
    company: 'DataCo', 
    match: 85, 
    location: 'Hybrid',
    type: 'Full-time'
  },
  { 
    title: 'Full Stack Developer', 
    company: 'DevSolutions', 
    match: 82, 
    location: 'Pune',
    type: 'Full-time'
  },
];

function StudentDashboard() {
  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            mb: 1
          }}
        >
          Welcome Back, Student! 🎓
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Here's your placement journey overview
        </Typography>
      </motion.div>

      {/* 1. Stat Widgets Row */}
      <Grid container spacing={3} mb={4}>
        {mockStats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StatWidget {...stat} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* 2. Main Content Row (ATS Scanner and Quick Actions) */}
      <Grid container spacing={3}>
        {/* ATS Scanner Card */}
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ATSScannerCard />
          </motion.div>
        </Grid>

        {/* Quick Actions Card */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" mb={2} sx={{ fontWeight: 700 }}>Quick Actions</Typography>
              <Box display="flex" flexDirection="column" gap={1.5}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{ 
                      mb: 1,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5568d3 0%, #653a8a 100%)',
                      }
                    }}
                    component={Link}
                    to="/student/ats-scanner"
                    onClick={() => toast.success('Opening ATS Scanner!')}
                  >
                    <ScannerIcon sx={{ mr: 1 }} /> Scan Resume
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ mb: 1 }}
                    component={Link}
                    to="/student/jobs"
                    onClick={() => toast.success('Opening job recommendations!')}
                  >
                    <RecommendIcon sx={{ mr: 1 }} /> View Job Matches
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    component={Link}
                    to="/student/profile"
                    onClick={() => toast.success('Opening profile!')}
                  >
                    <PersonIcon sx={{ mr: 1 }} /> Update Profile
                  </Button>
                </motion.div>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* 3. Recommended Jobs Section */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" mb={2} sx={{ fontWeight: 700 }}>
                Recommended Jobs Based on Your Profile
              </Typography>
              <Grid container spacing={2}>
                {mockRecommendedJobs.map((job, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Paper 
                        sx={{ 
                          p: 2, 
                          height: '100%',
                          borderLeft: '4px solid',
                          borderColor: 'primary.main',
                          cursor: 'pointer',
                          '&:hover': {
                            boxShadow: 3
                          }
                        }}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700 }}>
                            {job.title}
                          </Typography>
                          <Box 
                            sx={{ 
                              background: job.match >= 85 ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              borderRadius: '50%',
                              width: 40,
                              height: 40,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '0.8rem'
                            }}
                          >
                            {job.match}%
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" mb={0.5}>
                          {job.company}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                          📍 {job.location}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          bgcolor: 'primary.light', 
                          color: 'primary.dark',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          display: 'inline-block'
                        }}>
                          {job.type}
                        </Typography>
                        <Button 
                          size="small" 
                          fullWidth 
                          variant="text" 
                          sx={{ mt: 2 }}
                          onClick={() => toast.success(`Viewing details for ${job.title}`)}
                        >
                          View Details
                        </Button>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentDashboard;

