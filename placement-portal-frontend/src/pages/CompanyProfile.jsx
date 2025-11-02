import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { motion } from 'framer-motion';
import SaveIcon from '@mui/icons-material/Save';
import BusinessIcon from '@mui/icons-material/Business';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchCompanyProfile, updateCompanyProfile, deleteCompanyProfile } from '../api/company';

function CompanyProfile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    location: '',
    website: '',
    industry: '',
    size: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await fetchCompanyProfile();
      setProfile(data);
      setFormData({
        name: data.name || '',
        email: data.email || '',
        description: data.description || '',
        location: data.location || '',
        website: data.website || '',
        industry: data.industry || '',
        size: data.size || ''
      });
    } catch (err) {
      toast.error('Failed to load profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateCompanyProfile(formData);
      toast.success('Profile updated successfully!');
      loadProfile(); // Reload to get latest data
    } catch (err) {
      const msg = err?.detail || err?.message || 'Failed to update profile';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCompanyProfile();
      toast.success('Company profile deleted');
      localStorage.clear();
      navigate('/login', { replace: true });
    } catch (err) {
      const msg = err?.detail || err?.message || 'Failed to delete profile';
      toast.error(msg);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

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
            background: 'linear-gradient(135deg, #5B6CFF 0%, #7C4DFF 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            mb: 1
          }}
        >
          Company Profile 🏢
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Manage your company information and details
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
                  background: 'linear-gradient(135deg, #5B6CFF 0%, #7C4DFF 100%)',
                  fontSize: '2rem'
                }}
              >
                <BusinessIcon sx={{ fontSize: 48 }} />
              </Avatar>
              <Box flex={1}>
                <Typography variant="h5" fontWeight={700} mb={1}>
                  {profile?.name || 'Company Name'}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {profile?.email || 'company@example.com'}
                </Typography>
                {profile?.location && (
                  <Typography variant="body2" color="text.secondary">
                    📍 {profile.location}
                  </Typography>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Basic Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Basic Information
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField 
                label="Company Name" 
                name="name"
                value={formData.name} 
                onChange={handleChange} 
                fullWidth 
                required
              />
              <TextField 
                label="Email" 
                name="email"
                value={formData.email} 
                onChange={handleChange} 
                fullWidth 
                type="email"
                disabled
                helperText="Email cannot be changed"
              />
              <TextField 
                label="Location" 
                name="location"
                value={formData.location} 
                onChange={handleChange} 
                fullWidth 
                placeholder="e.g., Bangalore, India"
              />
              <TextField 
                label="Website" 
                name="website"
                value={formData.website} 
                onChange={handleChange} 
                fullWidth 
                placeholder="https://www.company.com"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Company Details */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Company Details
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField 
                label="Industry" 
                name="industry"
                value={formData.industry} 
                onChange={handleChange} 
                fullWidth 
                placeholder="e.g., Technology, Finance, Healthcare"
              />
              <TextField 
                label="Company Size" 
                name="size"
                value={formData.size} 
                onChange={handleChange} 
                fullWidth 
                placeholder="e.g., 1-50, 51-200, 201-500, 500+"
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                placeholder="Tell us about your company..."
              />
            </Box>
          </Paper>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
              <Box display="flex" gap={2}>
                <Button 
                  variant="contained" 
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={saving}
                  sx={{
                    background: 'linear-gradient(135deg, #5B6CFF 0%, #7C4DFF 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4A5BFF 0%, #6B3DFF 100%)',
                    }
                  }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button 
                  variant="outlined"
                  onClick={loadProfile}
                >
                  Cancel
                </Button>
              </Box>
              <Button 
                variant="outlined" 
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete Account
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Company Account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your company account? This action cannot be undone and will permanently delete all your data including jobs and applications.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CompanyProfile;

