//
// FILE: placement-portal-frontend/src/pages/StudentDashboard.jsx
//
import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Button, CircularProgress } from '@mui/material';
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

// 1. IMPORT YOUR API FUNCTIONS
import {
  fetchAllActiveJobs,
  fetchMyApplications,
} from '../api/student';

// 2. DELETE MOCK DATA
// const mockStats = [ ... ];
// const mockRecommendedJobs = [ ... ];

function StudentDashboard() {
  // 3. ADD STATE
  const [stats, setStats] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 4. ADD USEEFFECT TO FETCH DATA
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Fetch data in parallel
        const [jobsResponse, appsResponse] = await Promise.all([
          fetchAllActiveJobs(),
          fetchMyApplications(),
        ]);

        const jobs = jobsResponse.jobs || [];
        const applications = appsResponse.applications || [];

        // Build the stats array from LIVE data
        const newStats = [
          {
            title: 'Applications Sent',
            value: applications.length,
            trend: 'Your applications',
            IconComponent: AssignmentIcon,
            trendType: 'up'
          },
          {
            title: 'Available Jobs',
            value: jobs.length,
            trend: 'Based on your eligibility',
            IconComponent: WorkIcon,
            trendType: 'neutral'
          },
          {
            title: 'ATS Score',
            value: 'N/A', // This remains mocked for now
            trend: 'Scan your resume',
            IconComponent: InsightsIcon,
            trendType: 'neutral'
          },
          {
            title: 'Profile Views',
            value: 0, // This remains mocked for now
            trend: 'Last 30 days',
            IconComponent: TrendingUpIcon,
            trendType: 'neutral'
          },
        ];
        
        setStats(newStats);
        // Show the first 4 jobs on the dashboard
        setRecommendedJobs(jobs.slice(0, 4));

      } catch (err) {
        toast.error("Failed to load dashboard data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboard();
  }, []); // Run once

  // 5. ADD LOADING STATE
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

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

      {/* 1. Stat Widgets Row (NOW LIVE) */}
      <Grid container spacing={3} mb={4}>
        {stats.map((stat, index) => (
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

      {/* 2. Main Content Row (ATS Scanner is still mocked, Quick Actions are fine) */}
      <Grid container spacing={3}>
        {/* ATS Scanner Card */}
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ATSScannerCard /> {/* This page is still mocked, which is fine */}
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
                  >
                    <PersonIcon sx={{ mr: 1 }} /> Update Profile
                  </Button>
                </motion.div>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* 3. Recommended Jobs Section (NOW LIVE) */}
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
              {recommendedJobs.length === 0 ? (
                <Typography>No jobs posted yet. Check back soon!</Typography>
              ) : (
                <Grid container spacing={2}>
                  {recommendedJobs.map((job, index) => (
                    <Grid item xs={12} sm={6} md={3} key={job._id}>
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
                          </Box>
                          <Typography variant="body2" color="text.secondary" mb={0.5}>
                            {job.posted_by} {/* This is the company email for now */}
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
                            {job.experience_level || 'N/A'}
                          </Typography>
                          <Button
                            size="small"
                            fullWidth
                            variant="text"
                            sx={{ mt: 2 }}
                            component={Link} 
                            to="/student/jobs" // Link to the full jobs page
                          >
                            View Details
                          </Button>
                        </Paper>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentDashboard;