// src/components/ApplicationsTable.jsx
import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';

// Animated TableRow using framer-motion
const MotionTableRow = motion(TableRow);

const ApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${API_BASE_URL}/company/applications/recent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        // Map backend fields to frontend structure
        const formatted = (data.applications || []).map((app) => ({
          name: app.candidate_name || app.candidate_email?.split('@')[0] || 'Unknown',
          job: app.job_title || 'N/A',
          score: app.score ?? 0,
          date: new Date(app.applied_on).toLocaleDateString(),
        }));

        setApplications(formatted);
      } catch (err) {
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2} sx={{ fontWeight: 700 }}>
        Recent Applications
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'background.default' }}>
                  Candidate Name
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'background.default' }}>
                  Job Title
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'background.default' }}>
                  ATS Score
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'background.default' }}>
                  Date Applied
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'background.default' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No applications found.
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((app, index) => (
                  <MotionTableRow
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    hover
                  >
                    <TableCell>{app.name}</TableCell>
                    <TableCell>{app.job}</TableCell>
                    <TableCell>
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                        <Typography
                          color={app.score >= 80 ? 'success.main' : 'warning.main'}
                          sx={{ fontWeight: 600 }}
                        >
                          {app.score}%
                        </Typography>
                      </motion.div>
                    </TableCell>
                    <TableCell>{app.date}</TableCell>
                    <TableCell>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outlined" size="small" disabled>
                          Review
                        </Button>
                      </motion.div>
                    </TableCell>
                  </MotionTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Button variant="text" size="small">
          View All Applications
        </Button>
      </Box>
    </Paper>
  );
};

export default ApplicationsTable;
