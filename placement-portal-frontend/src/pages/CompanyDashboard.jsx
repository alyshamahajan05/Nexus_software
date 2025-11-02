import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkIcon from '@mui/icons-material/Work';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';

// Components
import StatWidget from '../components/statwidget';
import PipelineChart from '../components/PipelineChart';
import ApplicationsTable from '../components/ApplicationsTable';

// API imports (connects to your FastAPI backend)
import { fetchCompanyStats, fetchRecentApplications } from '../api/company';

function CompanyDashboard() {
  const [stats, setStats] = useState([]);
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load dashboard data from backend
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, appsData] = await Promise.all([
        fetchCompanyStats(),
        fetchRecentApplications(),
      ]);
      setStats(statsData);
      setRecentApps(appsData);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            background: 'linear-gradient(135deg, #5B6CFF 0%, #7C4DFF 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            mb: 1,
          }}
        >
          Welcome Back, Recruiter! 🎯
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Here’s what’s happening with your recruitment pipeline today.
        </Typography>
      </motion.div>

      {/* Stat Widgets */}
      <Grid container spacing={3} mb={4}>
        {(stats.length ? stats : [
          { title: 'Active Jobs', value: 0, trend: 'No data' },
          { title: 'Total Applicants', value: 0, trend: 'No data' },
          { title: 'ATS Qualified Rate', value: '0%', trend: 'No data' },
          { title: 'Interviews Scheduled', value: 0, trend: 'No data' },
        ]).map((stat, index) => {
          // Map icons to each stat based on index
          const icons = [WorkIcon, GroupIcon, BarChartIcon, AccessTimeIcon];
          return (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <StatWidget {...stat} IconComponent={icons[index]} />
            </motion.div>
          </Grid>
          );
        })}
      </Grid>

      {/* Pipeline Chart + Quick Actions */}
      <Grid container spacing={3}>
        {/* Candidate Pipeline */}
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Paper sx={{ p: 3, height: '100%', minHeight: 400 }}>
              <Typography variant="h6" mb={2} sx={{ fontWeight: 700 }}>
                Candidate Pipeline
              </Typography>
              <Box sx={{ width: '100%', minWidth: 0 }}>
                <PipelineChart />
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" mb={2} sx={{ fontWeight: 700 }}>
                Quick Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={1.5}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: 'linear-gradient(135deg, #5B6CFF 0%, #7C4DFF 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4A5BFF 0%, #6B3DFF 100%)',
                    },
                  }}
                  component={Link}
                  to="/company/jobs/new"
                >
                  <AddIcon sx={{ mr: 1 }} /> Post New Job
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  component={Link}
                  to="/company/candidates"
                >
                  <PeopleIcon sx={{ mr: 1 }} /> Review Top Candidates
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  component={Link}
                  to="/company/profile"
                >
                  <SettingsIcon sx={{ mr: 1 }} /> Update Company Profile
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* Recent Applications */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <ApplicationsTable data={recentApps} />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CompanyDashboard;
