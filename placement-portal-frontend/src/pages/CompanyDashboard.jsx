import React from 'react';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

// --- Imports for Stat Widgets ---
import StatWidget from '../components/statwidget'; 
import WorkIcon from '@mui/icons-material/Work';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// --- Imports for Applications Table ---
import ApplicationsTable from '../components/ApplicationsTable'; 
// --- Imports for Pipeline Chart ---
import PipelineChart from '../components/PipelineChart';
// --- Imports for Routing (optional, but good for Quick Actions) ---
import { Link } from 'react-router-dom';


// Mock Data for the Dashboard (Updated with icons and trend type)
const mockStats = [
  { 
    title: 'Active Jobs', 
    value: 12, 
    trend: '+3 since last month', 
    IconComponent: WorkIcon, 
    trendType: 'up' 
  },
  { 
    title: 'Total Applicants', 
    value: 452, 
    trend: 'View Pipeline', 
    IconComponent: GroupIcon, 
    trendType: 'neutral' 
  },
  { 
    title: 'ATS Qualified Rate', 
    value: '75%', 
    trend: 'Above avg.', 
    IconComponent: BarChartIcon, 
    trendType: 'up' 
  },
  { 
    title: 'Interviews Scheduled', 
    value: 7, 
    trend: 'Next 7 days', 
    IconComponent: AccessTimeIcon, 
    trendType: 'down' 
  },
];

const mockRecentApps = [
  { name: 'Alice Johnson', job: 'Software Engineer', score: 85, date: 'Oct 20' },
  { name: 'Bob Smith', job: 'Data Analyst', score: 62, date: 'Oct 19' },
  { name: 'Charlie Brown', job: 'Product Manager', score: 91, date: 'Oct 19' },
];


function CompanyDashboard() {
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
            background: 'linear-gradient(135deg, #5B6CFF 0%, #7C4DFF 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            mb: 1
          }}
        >
          Welcome Back, Recruiter! 🎯
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Here's what's happening with your recruitment pipeline today
        </Typography>
      </motion.div>

      {/* 1. Stat Widgets Row */}
      <Grid container spacing={3} mb={4}>
        {/* Render StatWidget for each item in mockStats */}
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

      {/* 2. Main Content Row (Pipeline Chart and Quick Actions) */}
      <Grid container spacing={3}>
        {/* Candidate Pipeline Chart (Placeholder) */}
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" mb={2} sx={{ fontWeight: 700 }}>Candidate Pipeline</Typography>
              <PipelineChart />
            </Paper>
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
                      background: 'linear-gradient(135deg, #5B6CFF 0%, #7C4DFF 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4A5BFF 0%, #6B3DFF 100%)',
                      }
                    }}
                    component={Link}
                    to="/company/jobs/new"
                    onClick={() => toast.success('Navigating to job posting form!')}
                  >
                    <AddIcon sx={{ mr: 1 }} /> Post New Job
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ mb: 1 }}
                    component={Link}
                    to="/company/candidates"
                    onClick={() => toast.success('Opening candidate screening!')}
                  >
                    <PeopleIcon sx={{ mr: 1 }} /> Review Top Candidates
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    component={Link}
                    to="/company/settings"
                    onClick={() => toast.success('Opening company settings!')}
                  >
                    <SettingsIcon sx={{ mr: 1 }} /> Update Company Profile
                  </Button>
                </motion.div>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* 3. Recent Applications Table */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <ApplicationsTable data={mockRecentApps} />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CompanyDashboard;