// src/components/PipelineChart.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#5B6CFF', '#7C4DFF', '#FF6B6B', '#4ECDC4', '#45B7D1'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          p: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="body2" color="primary.main">
          {payload[0].value} candidates
        </Typography>
      </Box>
    );
  }
  return null;
};

const PipelineChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPipelineData = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${API_BASE_URL}/company/applications/pipeline`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        // expected backend format: { Applied: 452, Shortlisted: 340, Interview: 89, Hired: 12 }
        const pipeline = result || {};

        const formattedData = Object.entries(pipeline).map(([stage, count], index) => ({
          stage: stage.charAt(0).toUpperCase() + stage.slice(1),
          count: count ?? 0,
          color: COLORS[index % COLORS.length],
        }));

        setData(formattedData);
      } catch (err) {
        console.error('Error fetching pipeline stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPipelineData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Box 
        sx={{ 
          height: 300, 
          width: '100%',
          minWidth: 0,
          minHeight: 300
        }}
      >
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="stage"
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Typography align="center" sx={{ mt: 10, color: 'text.secondary' }}>
            No pipeline data available.
          </Typography>
        )}
      </Box>
    </motion.div>
  );
};

export default PipelineChart;
