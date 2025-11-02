// src/pages/StudentProfile.jsx
import React from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  Grid,
  TextField,
  Button,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import toast from 'react-hot-toast';

function StudentProfile() {
  const handleSave = () => {
    toast.success('Profile updated successfully!');
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
          My Profile 👤
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Update your personal information and skills
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={3}>
              <Avatar 
                sx={{ 
                  width: 100, 
                  height: 100,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontSize: '2rem'
                }}
              >
                S
              </Avatar>
              <Box flex={1}>
                <Typography variant="h5" fontWeight={700} mb={1}>
                  Student Name
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Computer Science Engineering
                </Typography>
                <Chip label="Final Year" color="primary" size="small" />
              </Box>
              <Button 
                variant="outlined" 
                startIcon={<EditIcon />}
                onClick={() => toast.success('Edit mode enabled')}
              >
                Edit Profile
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Personal Information
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="Full Name" defaultValue="Student Name" fullWidth />
              <TextField label="Email" defaultValue="student@example.com" fullWidth type="email" />
              <TextField label="Phone" defaultValue="+91 9876543210" fullWidth />
              <TextField label="College" defaultValue="ABC University" fullWidth />
              <TextField label="Department" defaultValue="Computer Science" fullWidth />
              <TextField label="Year of Study" defaultValue="4th Year" fullWidth />
            </Box>
          </Paper>
        </Grid>

        {/* Academic Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Academic Information
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="CGPA/Percentage" defaultValue="8.5" fullWidth />
              <TextField label="10th Percentage" defaultValue="92%" fullWidth />
              <TextField label="12th Percentage" defaultValue="88%" fullWidth />
              <TextField label="Graduation Year" defaultValue="2025" fullWidth />
              <TextField 
                label="LinkedIn Profile" 
                defaultValue="linkedin.com/in/student" 
                fullWidth 
              />
              <TextField 
                label="GitHub Profile" 
                defaultValue="github.com/student" 
                fullWidth 
              />
            </Box>
          </Paper>
        </Grid>

        {/* Skills */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Skills
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
              {['React', 'Node.js', 'JavaScript', 'Python', 'MongoDB', 'SQL', 'Git', 'AWS'].map((skill) => (
                <Chip 
                  key={skill} 
                  label={skill} 
                  color="primary"
                  onDelete={() => toast.success(`${skill} removed`)}
                />
              ))}
            </Box>
            <TextField 
              placeholder="Add new skill" 
              size="small" 
              fullWidth
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  toast.success('Skill added!');
                  e.target.value = '';
                }
              }}
            />
          </Paper>
        </Grid>

        {/* About Me */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              About Me
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              defaultValue="I am a passionate software developer with a keen interest in web technologies and problem-solving. I love learning new technologies and building innovative solutions."
            />
          </Paper>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={() => toast.success('Changes discarded')}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #653a8a 100%)',
                }
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentProfile;



