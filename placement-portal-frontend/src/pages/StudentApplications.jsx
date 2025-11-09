//
// FILE: placement-portal-frontend/src/pages/StudentApplications.jsx
//
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import { fetchMyApplications } from '../api/student'; // <-- 1. IMPORT

// 2. DELETE THE mockApplications ARRAY

function StudentApplications() {
  // 3. ADD STATE
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 4. ADD USEEFFECT to fetch data
  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await fetchMyApplications();
        // The API returns { applications: [...] }
        setApplications(data.applications || []); // Use empty array as fallback
      } catch (err) {
        toast.error("Failed to load applications.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadApplications();
  }, []); // Run once

  // 5. ADD LOADING STATE
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  // Helper to get status color
  const getStatusColor = (status) => {
    status = status || 'Pending';
    switch (status) {
      case 'Accepted': return 'success';
      case 'Interview Scheduled': return 'info';
      case 'Under Review': return 'warning';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

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
          My Applications 📋
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Track all your job applications in one place
        </Typography>
      </motion.div>

      <Paper sx={{ p: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Job ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Applied Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* 6. USE THE 'applications' STATE and show empty state */}
              {applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    You have not applied to any jobs yet.
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((app, index) => (
                  <motion.tr
                    key={app._id} // Use the real ID
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    component={TableRow}
                    hover
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {app.job_id} {/* We'll need to fetch job titles later */}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {new Date(app.applied_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={app.status || 'Pending'}
                        color={getStatusColor(app.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => toast('View details (coming soon!)')}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Withdraw Application">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => toast('Withdraw (coming soon!)')}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default StudentApplications;