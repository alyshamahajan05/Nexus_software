// src/pages/JobRecommendations.jsx
import React, { useState } from 'react';
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
  Divider
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

// Mock job data with match scores
const mockJobs = [
  { 
    id: 1,
    title: 'Software Engineer Intern', 
    company: 'TechCorp', 
    match: 92, 
    location: 'Remote',
    type: 'Internship',
    salary: '₹20,000 - ₹30,000/month',
    skills: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
    posted: '2 days ago',
    applicants: 45,
    description: 'Looking for a passionate software engineer intern to join our team.'
  },
  { 
    id: 2,
    title: 'Frontend Developer', 
    company: 'StartupXYZ', 
    match: 88, 
    location: 'Bangalore',
    type: 'Full-time',
    salary: '₹6 - ₹10 LPA',
    skills: ['React', 'TypeScript', 'CSS', 'Redux'],
    posted: '1 week ago',
    applicants: 120,
    description: 'Join our dynamic team to build cutting-edge web applications.'
  },
  { 
    id: 3,
    title: 'Data Analyst', 
    company: 'DataCo', 
    match: 85, 
    location: 'Hybrid',
    type: 'Full-time',
    salary: '₹5 - ₹8 LPA',
    skills: ['Python', 'SQL', 'Tableau', 'Statistics'],
    posted: '3 days ago',
    applicants: 78,
    description: 'Analyze complex datasets and provide actionable insights.'
  },
  { 
    id: 4,
    title: 'Full Stack Developer', 
    company: 'DevSolutions', 
    match: 82, 
    location: 'Pune',
    type: 'Full-time',
    salary: '₹7 - ₹12 LPA',
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    posted: '5 days ago',
    applicants: 95,
    description: 'Build and maintain scalable web applications.'
  },
  { 
    id: 5,
    title: 'Backend Developer Intern', 
    company: 'CloudTech', 
    match: 79, 
    location: 'Remote',
    type: 'Internship',
    salary: '₹15,000 - ₹25,000/month',
    skills: ['Java', 'Spring Boot', 'MySQL', 'REST APIs'],
    posted: '1 day ago',
    applicants: 32,
    description: 'Work on backend services and APIs.'
  },
  { 
    id: 6,
    title: 'UI/UX Designer', 
    company: 'DesignHub', 
    match: 76, 
    location: 'Mumbai',
    type: 'Full-time',
    salary: '₹5 - ₹9 LPA',
    skills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping'],
    posted: '4 days ago',
    applicants: 67,
    description: 'Create beautiful and intuitive user interfaces.'
  },
];

function JobRecommendations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [savedJobs, setSavedJobs] = useState([]);

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

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || job.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const getMatchColor = (match) => {
    if (match >= 85) return { bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', text: 'white' };
    if (match >= 75) return { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: 'white' };
    return { bg: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)', text: 'white' };
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
                  <Typography variant="h4" fontWeight={700}>78%</Typography>
                  <Typography variant="body2">Your ATS Score</Typography>
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
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Paper>

      {/* Job Listings */}
      <Grid container spacing={3}>
        {filteredJobs.map((job, index) => (
          <Grid item xs={12} key={job.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Paper 
                sx={{ 
                  p: 3,
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <Grid container spacing={2}>
                  {/* Match Score Badge */}
                  <Grid item xs={12} md={2} display="flex" alignItems="center" justifyContent="center">
                    <Box 
                      sx={{ 
                        background: getMatchColor(job.match).bg,
                        borderRadius: 2,
                        p: 2,
                        textAlign: 'center',
                        minWidth: 100
                      }}
                    >
                      <Typography variant="h4" sx={{ color: getMatchColor(job.match).text, fontWeight: 700 }}>
                        {job.match}%
                      </Typography>
                      <Typography variant="caption" sx={{ color: getMatchColor(job.match).text, opacity: 0.9 }}>
                        Match
                      </Typography>
                    </Box>
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
                            {job.company}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        onClick={() => toggleSaveJob(job.id)}
                        sx={{ minWidth: 'auto', p: 1 }}
                      >
                        {savedJobs.includes(job.id) ? (
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
                        label={job.type} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                      <Chip 
                        label={job.salary} 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {job.description}
                    </Typography>

                    <Box display="flex" flexWrap="wrap" gap={0.5} mb={1}>
                      {job.skills.map((skill, idx) => (
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
                        Posted {job.posted} • {job.applicants} applicants
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
                        }
                      }}
                      onClick={() => toast.success(`Applied to ${job.title}!`)}
                    >
                      Apply Now
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      onClick={() => toast.success('Opening job details...')}
                    >
                      View Details
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {filteredJobs.length === 0 && (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" mb={1}>
            No jobs found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default JobRecommendations;

