//
// FILE: placement-portal-frontend/src/pages/StudentProfile.jsx
//
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Avatar,
  Chip,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import toast from 'react-hot-toast';
import { fetchStudentProfile, updateStudentProfile } from '../api/student'; // <-- 1. IMPORT

function StudentProfile() {
  // 2. ADD STATE for loading and profile data
  const [profile, setProfile] = useState(null); // Use null to show empty fields
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [skillInput, setSkillInput] = useState(""); // State for the skill input box

  // 3. ADD USEEFFECT to fetch data on page load
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchStudentProfile();
        // Initialize skills array if it's null/undefined from DB
        if (!data.skills) {
          data.skills = [];
        }
        setProfile(data); // Store the fetched profile in state
      } catch (err) {
        toast.error("Failed to load profile. Please log in again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []); // The empty [] means "run this only once"

  // 4. ADD handleChange to update state when typing
  const handleChange = (e) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // 5. ADD functions to handle skills
  const handleAddSkill = (e) => {
    // Only run on 'Enter' key
    if (e.key === 'Enter') {
      const newSkill = skillInput.trim();
      if (newSkill && !profile.skills.includes(newSkill)) {
        // Add the new skill to the profile state
        setProfile(prev => ({
          ...prev,
          skills: [...prev.skills, newSkill]
        }));
        setSkillInput(""); // Clear the input box
      }
      e.preventDefault();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // 6. UPDATE handleSave to call the API
  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      // updateStudentProfile now sends the *entire* profile object,
      // and our new backend schema will accept it.
      await updateStudentProfile(profile);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // 7. ADD LOADING STATE
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }
  
  // This prevents errors if the API failed
  if (!profile) {
     return <Typography>Could not load profile.</Typography>;
  }

  // 8. UPDATE JSX to use 'profile' state
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
                {profile.name ? profile.name[0].toUpperCase() : 'S'}
              </Avatar>
              <Box flex={1}>
                <Typography variant="h5" fontWeight={700} mb={1}>
                  {profile.name || 'Student Name'}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {profile.department || 'Your Department'}
                </Typography>
                <Chip label={profile.year || 'Your Year'} color="primary" size="small" />
              </Box>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
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
            <Box component="form" display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Full Name"
                name="name"
                value={profile.name || ''}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                value={profile.email || ''}
                onChange={handleChange}
                fullWidth
                disabled
              />
              <TextField
                label="Phone"
                name="phone"
                value={profile.phone || ''}
                onChange={handleChange}
                placeholder="+91 9876543210"
                fullWidth
              />
              <TextField
                label="College"
                name="college"
                value={profile.college || ''}
                onChange={handleChange}
                placeholder="ABC University"
                fullWidth
              />
              <TextField
                label="Department"
                name="department"
                value={profile.department || ''}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Year of Study"
                name="year"
                value={profile.year || ''}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </Paper>
        </Grid>

        {/* Academic Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Academic Information
            </Typography>
            <Box component="form" display="flex" flexDirection="column" gap={2}>
              <TextField
                label="CGPA/Percentage"
                name="cgpa"
                value={profile.cgpa || ''}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="10th Percentage"
                name="tenth_percentage"
                value={profile.tenth_percentage || ''}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="12th Percentage"
                name="twelfth_percentage"
                value={profile.twelfth_percentage || ''}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Graduation Year"
                name="graduation_year"
                value={profile.graduation_year || ''}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="LinkedIn Profile"
                name="linkedin_profile"
                value={profile.linkedin_profile || ''}
                onChange={handleChange}
                placeholder="linkedin.com/in/student"
                fullWidth
              />
              <TextField
                label="GitHub Profile"
                name="github_profile"
                value={profile.github_profile || ''}
                onChange={handleChange}
                placeholder="github.com/student"
                fullWidth
              />
            </Box>
          </Paper>
        </Grid>

        {/* Skills (NOW DYNAMIC) */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Skills
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
              {(profile.skills || []).map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  color="primary"
                  onDelete={() => handleRemoveSkill(skill)}
                />
              ))}
            </Box>
            <TextField
              placeholder="Add new skill and press Enter"
              size="small"
              fullWidth
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={handleAddSkill}
            />
          </Paper>
        </Grid>

        {/* About Me (NOW DYNAMIC) */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              About Me
            </Typography>
            <TextField
              label="Tell us about yourself (not saved yet)"
              name="about_me"
              multiline
              rows={4}
              fullWidth
              value={profile.about_me || ''}
              onChange={handleChange}
            />
          </Paper>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined">
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave} // This now saves *everything*
              disabled={saving}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #653a8a 100%)',
                }
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentProfile;