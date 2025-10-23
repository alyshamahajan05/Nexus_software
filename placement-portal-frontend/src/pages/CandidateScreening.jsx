import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function CandidateScreening() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Candidate Screening (ATS) 🔎
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Review applicants, filter by ATS score, and move candidates through the pipeline.
      </Typography>
      <Paper sx={{ p: 3, height: 400 }}>
         {/* Placeholder for Job Selector, ATS Filter, and Candidate List */}
        <Typography variant="h6" color="text.disabled">
          ATS Interface Coming Soon
        </Typography>
      </Paper>
    </Box>
  );
}

export default CandidateScreening;