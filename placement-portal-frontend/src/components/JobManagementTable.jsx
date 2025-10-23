import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

const mockJobs = [
  { id: 1, title: 'Software Engineer (Frontend)', status: 'Active', applicants: 125, date: 'Oct 10', atsReq: 'React, Redux' },
  { id: 2, title: 'Data Scientist Intern', status: 'Draft', applicants: 0, date: 'Oct 22', atsReq: 'Python, ML' },
  { id: 3, title: 'Product Manager', status: 'Closed', applicants: 89, date: 'Sep 15', atsReq: 'Agile, SQL' },
];

const statusColors = {
  Active: 'success',
  Draft: 'warning',
  Closed: 'error',
};

function JobManagementTable() {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            {['Job Title', 'Status', 'Applicants', 'Date Posted', 'Action'].map((head) => (
              <TableCell key={head} sx={{ fontWeight: 'bold', backgroundColor: 'background.default' }}>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {mockJobs.map((job, idx) => (
            <motion.tr
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              component={TableRow}
              hover
              sx={{ backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}
            >
              <TableCell>{job.title}</TableCell>
              <TableCell>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Chip label={job.status} color={statusColors[job.status]} size="small" />
                </motion.div>
              </TableCell>
              <TableCell>{job.applicants}</TableCell>
              <TableCell>{job.date}</TableCell>
              <TableCell>
                <Box display="flex" gap={1}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="contained" size="small" disabled={job.status !== 'Active'}>
                      View Cands
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outlined" size="small" color="secondary">
                      Edit
                    </Button>
                  </motion.div>
                </Box>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default JobManagementTable;