import React from 'react';
import { Box, Typography } from '@mui/material';
import JobManagementTable from '../components/JobManagementTable'; // To be built next

function JobManagement() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Job Management 💼
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Manage all job postings: active, drafts, and closed positions.
      </Typography>
      {/* Placeholder for the Job Table and filters */}
      <JobManagementTable />
    </Box>
  );
}

export default JobManagement;