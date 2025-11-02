// src/pages/StudentApplications.jsx
import React from 'react';
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
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';

const mockApplications = [
  {
    id: 1,
    jobTitle: 'Software Engineer Intern',
    company: 'TechCorp',
    appliedDate: 'Oct 20, 2024',
    status: 'Under Review',
    statusColor: 'warning'
  },
  {
    id: 2,
    jobTitle: 'Frontend Developer',
    company: 'StartupXYZ',
    appliedDate: 'Oct 18, 2024',
    status: 'Interview Scheduled',
    statusColor: 'info'
  },
  {
    id: 3,
    jobTitle: 'Data Analyst',
    company: 'DataCo',
    appliedDate: 'Oct 15, 2024',
    status: 'Accepted',
    statusColor: 'success'
  },
  {
    id: 4,
    jobTitle: 'Backend Developer',
    company: 'CloudTech',
    appliedDate: 'Oct 12, 2024',
    status: 'Rejected',
    statusColor: 'error'
  },
  {
    id: 5,
    jobTitle: 'Full Stack Developer',
    company: 'DevSolutions',
    appliedDate: 'Oct 10, 2024',
    status: 'Pending',
    statusColor: 'default'
  },
];

function StudentApplications() {
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
                <TableCell sx={{ fontWeight: 700 }}>Job Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Applied Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockApplications.map((app, index) => (
                <motion.tr
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  component={TableRow}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {app.jobTitle}
                    </Typography>
                  </TableCell>
                  <TableCell>{app.company}</TableCell>
                  <TableCell>{app.appliedDate}</TableCell>
                  <TableCell>
                    <Chip 
                      label={app.status} 
                      color={app.statusColor}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => toast.success(`Viewing details for ${app.jobTitle}`)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Withdraw Application">
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => toast.success('Application withdrawn')}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default StudentApplications;




