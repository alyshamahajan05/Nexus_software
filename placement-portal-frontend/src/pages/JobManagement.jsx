import React, { useRef, useState } from "react";
import {
  Typography,
  Paper,
  Box,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import JobManagementTable from "../components/JobManagementTable";

function JobManagement() {
  const tableRef = useRef(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 800,
            mb: 1,
          }}
        >
          Job Management
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Manage and track all job listings from your company dashboard.
        </Typography>
      </motion.div>

      {/* Search + Filters */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
          borderRadius: 3,
          background: "background.paper",
          mb: 3,
        }}
      >
        {/* 🔍 Search bar */}
        <TextField
          placeholder="Search job by title or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "#fafafa",
              transition: "all 0.2s",
              "&:hover": { backgroundColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#5b6cff" },
            },
          }}
        />

        {/* Status Filter */}
        <ToggleButtonGroup
          value={statusFilter}
          exclusive
          onChange={(_, v) => v && setStatusFilter(v)}
          size="small"
          color="primary"
          sx={{
            borderRadius: 3,
            "& .MuiToggleButton-root": {
              borderRadius: 3,
              textTransform: "capitalize",
              fontWeight: 500,
              px: 2,
            },
          }}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">
            <Chip label="Active" color="success" size="small" />
          </ToggleButton>
          <ToggleButton value="closed">
            <Chip label="Closed" size="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>

      {/* Jobs Table */}
      <Paper sx={{ p: 3 }}>
        {/* ✅ Pass query and status down to fetch from backend */}
        <JobManagementTable
          ref={tableRef}
          query={query}
          status={statusFilter}
        />
      </Paper>
    </Box>
  );
}

export default JobManagement;
