// src/components/ATSScannerCard.jsx
import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Button, 
  LinearProgress,
  Chip,
  Alert,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InsightsIcon from '@mui/icons-material/Insights';

function ATSScannerCard() {
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
        strengths: [
          'Strong technical skills section',
          'Clear work experience descriptions',
          'Relevant keywords present'
        ],
        improvements: [
          'Add more quantifiable achievements',
          'Include soft skills',
          'Optimize formatting for ATS compatibility'
        ],
        matchedJobs: 12
      });
      setScanning(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <InsightsIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          ATS Resume Scanner
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Upload your resume to get an ATS compatibility score and job recommendations
      </Typography>

      {/* Upload Section */}
      <Box mb={3}>
        <input
          accept=".pdf"
          style={{ display: 'none' }}
          id="resume-upload"
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="resume-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<UploadFileIcon />}
            fullWidth
            sx={{ mb: 2 }}
          >
            {uploadedFile ? 'Change Resume' : 'Upload Resume (PDF)'}
          </Button>
        </label>
        
        {uploadedFile && (
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Chip 
              label={uploadedFile.name} 
              onDelete={() => setUploadedFile(null)}
              color="primary"
              variant="outlined"
            />
          </Box>
        )}

        {uploadedFile && !scanResult && (
          <Button
            variant="contained"
            fullWidth
            onClick={handleScan}
            disabled={scanning}
            sx={{
              background: 'linear-gradient(135deg, #5B6CFF 0%, #7C4DFF 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4A5BFF 0%, #6B3DFF 100%)',
              }
            }}
          >
            {scanning ? 'Scanning...' : 'Scan Resume'}
          </Button>
        )}
      </Box>

      {scanning && (
        <Box mb={3}>
          <Typography variant="body2" mb={1}>Analyzing your resume...</Typography>
          <LinearProgress />
        </Box>
      )}

      {/* Results Section */}
      {scanResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ mb: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent>
              <Typography variant="h3" align="center" sx={{ color: 'white', fontWeight: 700 }}>
                {scanResult.score}
              </Typography>
              <Typography variant="body2" align="center" sx={{ color: 'white', opacity: 0.9 }}>
                ATS Compatibility Score
              </Typography>
            </CardContent>
          </Card>

          <Alert severity={getScoreColor(scanResult.score)} sx={{ mb: 2 }}>
            Your resume has {scanResult.matchedJobs} matching job opportunities!
          </Alert>

          <Box mb={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon sx={{ mr: 0.5, fontSize: 18, color: 'success.main' }} />
              Strengths
            </Typography>
            {scanResult.strengths.map((strength, idx) => (
              <Chip 
                key={idx} 
                label={strength} 
                size="small" 
                sx={{ mr: 1, mb: 1 }} 
                color="success"
                variant="outlined"
              />
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center' }}>
              <WarningIcon sx={{ mr: 0.5, fontSize: 18, color: 'warning.main' }} />
              Areas for Improvement
            </Typography>
            {scanResult.improvements.map((improvement, idx) => (
              <Chip 
                key={idx} 
                label={improvement} 
                size="small" 
                sx={{ mr: 1, mb: 1 }} 
                color="warning"
                variant="outlined"
              />
            ))}
          </Box>

          <Button
            variant="text"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              setUploadedFile(null);
              setScanResult(null);
            }}
          >
            Scan Another Resume
          </Button>
        </motion.div>
      )}
    </Paper>
  );
}

export default ATSScannerCard;

