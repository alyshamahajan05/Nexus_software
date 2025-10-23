import React from 'react';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';

function JobPostForm() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Post New Job 🚀
      </Typography>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" mb={3}>
          Enter Job Details
        </Typography>
        {/* Simple form placeholder */}
        <TextField label="Job Title" fullWidth margin="normal" />
        <TextField label="Job Description" multiline rows={4} fullWidth margin="normal" />
        <TextField label="Key Requirements (for ATS matching)" multiline rows={3} fullWidth margin="normal" />
        <Button variant="contained" sx={{ mt: 3 }}>
          Save & Publish
        </Button>
      </Paper>
    </Box>
  );
}

export default JobPostForm;