// src/pages/ATSScanner.jsx
import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Button, 
  LinearProgress,
  Grid,
  Chip,
  Alert,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { motion } from 'framer-motion';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import WorkIcon from '@mui/icons-material/Work';

function ATSScanner() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setScanResult(null);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleScan = () => {
    if (!uploadedFile) return;
    
    setScanning(true);
    
    // Simulate API call - Replace with actual AI integration later
    setTimeout(() => {
      setScanResult({
        score: 78,
        status: 'good',
        category: 'ATS Compatible',
        strengths: [
          'Strong technical skills section with relevant keywords',
          'Clear and concise work experience descriptions',
          'Well-formatted contact information',
          'Proper use of action verbs',
          'Relevant certifications included'
        ],
        improvements: [
          'Add more quantifiable achievements with metrics',
          'Include soft skills section',
          'Optimize keyword density for target roles',
          'Add project links or portfolio URL',
          'Consider adding summary/objective section'
        ],
        criticalIssues: [
          'Missing standard ATS-friendly format',
          'Some special characters may not parse correctly'
        ],
        recommendations: [
          'Add keywords like: "React", "Node.js", "AWS", "Agile"',
          'Include GPA if above 3.0',
          'Add technical project descriptions',
          'Include LinkedIn profile link'
        ],
        matchedJobs: 12,
        topMatchingRoles: [
          { title: 'Software Engineer', match: 92, company: 'TechCorp' },
          { title: 'Frontend Developer', match: 88, company: 'StartupXYZ' },
          { title: 'Full Stack Developer', match: 85, company: 'DevSolutions' }
        ]
      });
      setScanning(false);
    }, 3000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return { color: 'success', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' };
    if (score >= 60) return { color: 'warning', gradient: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)' };
    return { color: 'error', gradient: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)' };
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
          ATS Resume Scanner 🔍
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Upload your resume to analyze ATS compatibility and get personalized job recommendations
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {/* Upload Section */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" mb={2} sx={{ fontWeight: 700 }}>
                Upload Resume
              </Typography>
              
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: uploadedFile ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  mb: 2,
                  bgcolor: uploadedFile ? 'primary.light' : 'transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                <UploadFileIcon sx={{ fontSize: 48, color: uploadedFile ? 'primary.main' : 'text.secondary', mb: 1 }} />
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {uploadedFile ? uploadedFile.name : 'Drop your resume here or click to browse'}
                </Typography>
                <input
                  accept=".pdf"
                  style={{ display: 'none' }}
                  id="resume-upload-full"
                  type="file"
                  onChange={handleFileUpload}
                />
                <label htmlFor="resume-upload-full">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<UploadFileIcon />}
                  >
                    {uploadedFile ? 'Change Resume' : 'Browse Files'}
                  </Button>
                </label>
              </Box>

              <Alert severity="info" sx={{ mb: 2 }}>
                Supported format: PDF only. Max size: 5MB
              </Alert>

              {uploadedFile && (
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleScan}
                  disabled={scanning}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #653a8a 100%)',
                    },
                    py: 1.5
                  }}
                >
                  {scanning ? 'Analyzing...' : 'Scan Resume'}
                </Button>
              )}
            </Paper>
          </motion.div>
        </Grid>

        {/* Results Section */}
        <Grid item xs={12} lg={8}>
          {scanning && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>Analyzing Your Resume...</Typography>
              <LinearProgress />
              <Typography variant="body2" color="text.secondary" mt={2}>
                Please wait while we scan your resume for ATS compatibility, keywords, and job matches.
              </Typography>
            </Paper>
          )}

          {scanResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Grid container spacing={3}>
                {/* Score Card */}
                <Grid item xs={12}>
                  <Card sx={{ background: getScoreColor(scanResult.score).gradient, color: 'white' }}>
                    <CardContent>
                      <Grid container alignItems="center">
                        <Grid item xs={12} md={4} textAlign="center">
                          <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
                            {scanResult.score}
                          </Typography>
                          <Typography variant="h6" sx={{ opacity: 0.9 }}>
                            ATS Score
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <Typography variant="h6" mb={1}>
                            {scanResult.category}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            Your resume has {scanResult.matchedJobs} matching job opportunities based on your profile and skills!
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Strengths */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center' }}>
                      <CheckCircleIcon sx={{ mr: 1, color: 'success.main' }} />
                      Strengths
                    </Typography>
                    <List dense>
                      {scanResult.strengths.map((strength, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={strength} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>

                {/* Improvements */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center' }}>
                      <WarningIcon sx={{ mr: 1, color: 'warning.main' }} />
                      Areas for Improvement
                    </Typography>
                    <List dense>
                      {scanResult.improvements.map((improvement, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <WarningIcon color="warning" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={improvement} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>

                {/* Critical Issues */}
                {scanResult.criticalIssues.length > 0 && (
                  <Grid item xs={12}>
                    <Alert severity="error" icon={<ErrorIcon />}>
                      <Typography variant="subtitle2" fontWeight={700} mb={1}>
                        Critical Issues to Fix:
                      </Typography>
                      <List dense>
                        {scanResult.criticalIssues.map((issue, idx) => (
                          <ListItem key={idx} sx={{ py: 0 }}>
                            <ListItemText primary={`• ${issue}`} />
                          </ListItem>
                        ))}
                      </List>
                    </Alert>
                  </Grid>
                )}

                {/* Recommendations */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center' }}>
                      <TipsAndUpdatesIcon sx={{ mr: 1, color: 'primary.main' }} />
                      AI Recommendations
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {scanResult.recommendations.map((rec, idx) => (
                        <Chip 
                          key={idx} 
                          label={rec} 
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Paper>
                </Grid>

                {/* Top Matching Jobs */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center' }}>
                      <WorkIcon sx={{ mr: 1, color: 'primary.main' }} />
                      Top Matching Jobs
                    </Typography>
                    <Grid container spacing={2}>
                      {scanResult.topMatchingRoles.map((job, idx) => (
                        <Grid item xs={12} md={4} key={idx}>
                          <Paper 
                            elevation={0}
                            sx={{ 
                              p: 2, 
                              borderLeft: '4px solid',
                              borderColor: 'primary.main',
                              bgcolor: 'background.default'
                            }}
                          >
                            <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                {job.title}
                              </Typography>
                              <Chip 
                                label={`${job.match}%`} 
                                size="small" 
                                color="success"
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {job.company}
                            </Typography>
                            <Button size="small" variant="text" sx={{ mt: 1 }}>
                              View Details
                            </Button>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>

                {/* Action Buttons */}
                <Grid item xs={12}>
                  <Box display="flex" gap={2}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setUploadedFile(null);
                        setScanResult(null);
                      }}
                    >
                      Scan Another Resume
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                    >
                      View All Job Recommendations
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </motion.div>
          )}

          {!uploadedFile && !scanning && !scanResult && (
            <Paper 
              sx={{ 
                p: 6, 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
              }}
            >
              <Typography variant="h6" color="text.secondary" mb={2}>
                No resume uploaded yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload your resume to get started with ATS analysis and job recommendations
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default ATSScanner;

