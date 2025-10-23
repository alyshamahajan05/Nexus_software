import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

// Helper component for the Recent Applications table
const ApplicationsTable = ({ data }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2} sx={{ fontWeight: 700 }}>
        Recent Applications
      </Typography>
      <TableContainer>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'background.default' }}>Candidate Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'background.default' }}>Job Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'background.default' }}>ATS Score</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'background.default' }}>Date Applied</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'background.default' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((app, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                component={TableRow}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.job}</TableCell>
                <TableCell>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
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
                    <Button variant="outlined" size="small">Review</Button>
                  </motion.div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Optional: Button to view all applications */}
      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Button variant="text" size="small">View All Applications</Button>
      </Box>
    </Paper>
  );
};

export default ApplicationsTable;