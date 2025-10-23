import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Example icon
import { motion } from 'framer-motion';

/**
 * Reusable component to display a single key statistic/metric.
 * * @param {string} title - The title of the statistic (e.g., "Active Jobs").
 * @param {string|number} value - The main numerical value (e.g., 12).
 * @param {string} trend - A small description of the trend or secondary data (e.g., "+3 since last month").
 * @param {string} trendType - Determines the color/icon of the trend: 'up', 'down', or 'neutral'.
 * @param {object} IconComponent - An optional MUI Icon component to display (e.g., AttachMoneyIcon).
 */
const StatWidget = ({ 
  title, 
  value, 
  trend, 
  trendType = 'neutral', 
  IconComponent = AttachMoneyIcon // Default Icon 
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Logic to set trend color and icon based on trendType
  let trendColor = 'text.secondary';
  let TrendIcon = null;
  
  if (trendType === 'up') {
    trendColor = 'success.main'; // Green for positive
    TrendIcon = ArrowUpwardIcon;
  } else if (trendType === 'down') {
    trendColor = 'error.main';   // Red for negative
    TrendIcon = ArrowDownwardIcon;
  }

  // Animate counter when component mounts
  useEffect(() => {
    setIsVisible(true);
    const numericValue = typeof value === 'string' ? parseInt(value.replace(/[^\d]/g, '')) : value;
    if (typeof numericValue === 'number') {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setAnimatedValue(numericValue);
          clearInterval(timer);
        } else {
          setAnimatedValue(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    } else {
      setAnimatedValue(value);
    }
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <Card
        elevation={3}
        sx={{
          minWidth: 275,
          background: 'linear-gradient(135deg, rgba(91,108,255,0.12) 0%, rgba(124,77,255,0.08) 50%, rgba(255,255,255,1) 100%)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': { 
            transform: 'translateY(-4px)', 
            boxShadow: '0 12px 24px rgba(91,108,255,0.15)',
            background: 'linear-gradient(135deg, rgba(91,108,255,0.18) 0%, rgba(124,77,255,0.12) 50%, rgba(255,255,255,1) 100%)',
          },
        }}
      >
        <CardContent>
          {/* Top Section: Title and Icon */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
              {title}
            </Typography>
            <motion.div
              animate={{ rotate: isVisible ? 360 : 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <IconComponent color="action" sx={{ fontSize: 24 }} />
            </motion.div>
          </Box>

          {/* Middle Section: Main Value */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {typeof value === 'string' && value.includes('%') 
                ? `${animatedValue}%` 
                : typeof value === 'string' && value.includes('$')
                ? `$${animatedValue.toLocaleString()}`
                : animatedValue.toLocaleString()}
            </Typography>
          </motion.div>

          <Divider sx={{ my: 1.5, opacity: 0.3 }} />

          {/* Bottom Section: Trend/Secondary Info */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Box display="flex" alignItems="center">
              {TrendIcon && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: trendType === 'up' ? [0, -10, 0] : [0, 10, 0]
                  }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <TrendIcon sx={{ fontSize: 16, mr: 0.5, color: trendColor }} />
                </motion.div>
              )}
              <Typography variant="body2" color={trendColor} sx={{ fontWeight: 500 }}>
                {trend}
              </Typography>
            </Box>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatWidget;