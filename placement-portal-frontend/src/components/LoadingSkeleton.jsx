import React from "react";
import { Box, Skeleton } from "@mui/material";
import { motion } from "framer-motion";

/** Animated skeleton for statistic widgets */
const StatWidgetSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Box
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="circular" width={24} height={24} />
      </Box>
      <Skeleton variant="text" width="40%" height={48} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="80%" height={20} />
    </Box>
  </motion.div>
);

/** Animated skeleton for tables */
const TableSkeleton = ({ rows = 3 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Box
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
      {Array.from({ length: rows }).map((_, index) => (
        <Box key={index} display="flex" gap={2} mb={1}>
          <Skeleton variant="text" width="25%" height={40} />
          <Skeleton variant="text" width="15%" height={40} />
          <Skeleton variant="text" width="15%" height={40} />
          <Skeleton variant="text" width="15%" height={40} />
          <Skeleton variant="text" width="20%" height={40} />
        </Box>
      ))}
    </Box>
  </motion.div>
);

/** Animated skeleton for charts */
const ChartSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Box
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Box>
  </motion.div>
);

export { StatWidgetSkeleton, TableSkeleton, ChartSkeleton };
