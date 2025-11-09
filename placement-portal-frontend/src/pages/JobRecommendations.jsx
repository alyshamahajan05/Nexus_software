//
// FILE: placement-portal-frontend/src/pages/JobRecommendations.jsx
//
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import toast from 'react-hot-toast';

// 1. IMPORT ALL YOUR API FUNCTIONS
import {
  fetchAllActiveJobs,
  fetchMyApplications,
  fetchStudentProfile,
  applyForJob
} from '../api/student';

// 2. DELETE the 'mockJobs' array

function JobRecommendations() {
  // 3. ADD ALL YOUR STATE
  const [jobs, setJobs] = useState([]); // Will hold the *final* smart list
  const [loading, setLoading] = useState(true);
  const [studentProfile, setStudentProfile] = useState(null); // For Layer 2
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [savedJobs, setSavedJobs] = useState([]);

  // 4. ADD THE useEffect hook to load all data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch all 3 data sources at the same time
        const [jobsResponse, appsResponse, profileResponse] = await Promise.all([
          fetchAllActiveJobs(),
          fetchMyApplications(),
          fetchStudentProfile()
        ]);

        const studentProfile = profileResponse;
        const allJobs = jobsResponse.jobs || []; // Layer 1 filter already done!
        
        setStudentProfile(studentProfile); // Save profile for stats

        // Create a "lookup map" of jobs I've applied to for speed
        const myApplicationsMap = (appsResponse.applications || []).reduce((acc, app) => {
          acc[app.job_id] = app.status; // e.g., {"job-abc": "Selected"}
          return acc;
        }, {});

        // "Enrich" the jobs list with Layer 2 (Verification) logic
        const enrichedJobs = allJobs.map(job => {
          const myAppStatus = myApplicationsMap[job._id]; // Your application status
          
          let eligibilityStatus = "Eligible";
          let eligibilityWarnings = [];

          // --- THIS IS YOUR LAYER 2 LOGIC ---
          // Check if the 'eligibility' field exists
          // NOTE: Your job schema doesn't have this field yet,
          // so this code is future-proof for when you add it.
          if (job.eligibility && studentProfile) { 
            if (job.eligibility.min_cgpa && studentProfile.cgpa < job.eligibility.min_cgpa) {
              eligibilityStatus = "Not Eligible";
              eligibilityWarnings.push(`Requires ${job.eligibility.min_cgpa} CGPA`);
            }
            if (
              job.eligibility.allowed_departments &&
              !job.eligibility.allowed_departments.includes(studentProfile.department)
            ) {
              eligibilityStatus = "Not Eligible";
              eligibilityWarnings.push(`For ${job.eligibility.allowed_departments.join(', ')}`);
            }
          }
          // --- END OF LAYER 2 LOGIC ---

          return {
            ...job,
            myAppStatus: myAppStatus,
            eligibilityStatus: eligibilityStatus,
            eligibilityWarnings: eligibilityWarnings
          };
        });

        setJobs(enrichedJobs); // Set the final, smart list

      } catch (err) {
        toast.error("Failed to load jobs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); // Run once

  // 5. ADD an 'handleApply' function
  const handleApply = async (jobId) => {
    try {
      const response = await applyForJob(jobId);
      toast.success(response.message || "Applied successfully!");
      // Update the UI instantly without a full reload
      setJobs(prevJobs => prevJobs.map(j =>
        j._id === jobId ? { ...j, myAppStatus: "Applied" } : j
      ));
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to apply");
    }
  };

  // (toggleSaveJob and handleFilterChange are fine as-is)
  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilterType(newFilter);
    }
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      if (prev.includes(jobId)) {
        toast.success('Job removed from saved list');
        return prev.filter(id => id !== jobId);
      } else {
        toast.success('Job saved successfully!');
        return [...prev, jobId];
      }
    });
  };

  // 6. UPDATE 'filteredJobs' to use the new 'jobs' state
  const filteredJobs = jobs.filter(job => {
    const jobSkills = job.skills_required || [];
    const jobCompany = job.posted_by || ''; // Use posted_by for company
    
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          jobCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          jobSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter for job type (e.g., 'Internship', 'Full-time')
    const jobType = (job.experience_level || 'N/A').toLowerCase();
    const matchesType = filterType === 'all' || jobType.includes(filterType.toLowerCase());
                        
    return matchesSearch && matchesType;
  });

  // (getMatchColor is fine)
  const getMatchColor = (match) => {
    if (match >= 85) return { bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', text: 'white' };
    if (match >= 75) return { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: 'white' };
    return { bg: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)', text: 'white' };
  };
  
  // 7. ADD LOADING STATE
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            mb: 1
          }}
        >
          Job Recommendations 💼
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Jobs matched to your profile and ATS score
        </Typography>
      </motion.div>

      {/* Stats Overview */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  {/* This count is now LIVE */}
                  <Typography variant="h4" fontWeight={700}>{filteredJobs.length}</Typography>
                  <Typography variant="body2">Matching Jobs</Typography>
                </Box>
                <WorkIcon sx={{ fontSize: 48, opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight={700}>{savedJobs.length}</Typography>
                  <Typography variant="body2">Saved Jobs</Typography>
                </Box>
                <BookmarkIcon sx={{ fontSize: 48, opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight={700}>{studentProfile?.cgpa || 'N/A'}</Typography>
                  <Typography variant="body2">Your CGPA</Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 48, opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by job title, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ToggleButtonGroup
              value={filterType}
              exclusive
              onChange={handleFilterChange}
              fullWidth
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="full-time">Full-time</ToggleButton>
              <ToggleButton value="internship">Internship</ToggleButton>
              <ToggleButton value="fresher">Fresher</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Paper>

      {/* Job Listings */}
      <Grid container spacing={3}>
        {/* 8. UPDATE THE JOB MAP & EMPTY STATE */}
        {filteredJobs.length === 0 ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 6, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No jobs found that match your filters or eligibility.
              </Typography>
            </Paper>
          </Grid>
        ) : (
          filteredJobs.map((job, index) => (
            <Grid item xs={12} key={job._id}> {/* Use real ID */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    borderLeft: '4px solid',
                    // Use Layer 2 data for the border color
                    borderColor: job.eligibilityStatus === 'Eligible' ? 'success.main' : 'warning.main',
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  <Grid container spacing={2}>
                    {/* Match Score Badge (Layer 2) */}
                    <Grid item xs={12} md={2} display="flex" alignItems="center" justifyContent="center">
                      <Tooltip title={job.eligibilityWarnings.join(', ')}>
                        <Box
                          sx={{
                            // Use Layer 2 data for the background
                            background: getMatchColor(job.eligibilityStatus === 'Eligible' ? 90 : 70).bg, // Mock score
                            borderRadius: 2,
                            p: 2,
                            textAlign: 'center',
                            minWidth: 100
                          }}
                        >
                          <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                            {job.eligibilityStatus === 'Eligible' ? '✅' : '⚠️'}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'white', opacity: 0.9 }}>
                            {job.eligibilityStatus}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </Grid>

                    {/* Job Details */}
                    <Grid item xs={12} md={8}>
                      <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                        <Box>
                          <Typography variant="h6" fontWeight={700} mb={0.5}>
                            {job.title}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <BusinessIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {job.posted_by} {/* This is the company email for now */}
                            </Typography>
                          </Box>
                        </Box>
                        <Button
                          onClick={() => toggleSaveJob(job._id)}
                          sx={{ minWidth: 'auto', p: 1 }}
                        >
                          {savedJobs.includes(job._id) ? (
                            <BookmarkIcon color="primary" />
                          ) : (
                            <BookmarkBorderIcon />
                          )}
                        </Button>
                      </Box>

                      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                        <Chip
                          icon={<LocationOnIcon />}
                          label={job.location}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          label={job.experience_level || 'N/A'}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={job.salary || 'N/A'}
                          size="small"
                          variant="outlined"
                        />
                      </Box>

                      <Typography variant="body2" color="text.secondary" mb={2} sx={{ whiteSpace: 'pre-wrap' }}>
                        {job.description}
                      </Typography>

                      <Box display="flex" flexWrap="wrap" gap={0.5} mb={1}>
                        {(job.skills_required || []).map((skill, idx) => (
                          <Chip
                            key={idx}
                            label={skill}
                            size="small"
                            sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
                          />
                        ))}
                      </Box>

                      <Divider sx={{ my: 1.5 }} />

                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" color="text.secondary">
                          Posted {new Date(job.posted_on).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Action Buttons */}
                    <Grid item xs={12} md={2} display="flex" flexDirection="column" gap={1} justifyContent="center">
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #5568d3 0%, #653a8a 100%)',
                          },
                          '&:disabled': {
                            background: 'grey.300'
                          }
                        }}
                        onClick={() => handleApply(job._id)}
                        disabled={!!job.myAppStatus || job.status === 'closed'}
                      >
                        {job.myAppStatus ? job.myAppStatus : (job.status === 'closed' ? 'Closed' : 'Apply Now')}
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                      >
                        View Details
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default JobRecommendations;