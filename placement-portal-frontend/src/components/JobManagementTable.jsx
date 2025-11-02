import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, Typography, Box, Chip, CircularProgress,
  Paper, TableContainer, Tooltip, Button
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import RefreshIcon from "@mui/icons-material/Refresh";
import toast from "react-hot-toast";
import { fetchMyJobs, deleteJob, changeJobStatus } from "../api/jobs";

/**
 * JobManagementTable Component
 * Displays and manages the company's posted jobs.
 */
const JobManagementTable = forwardRef(({ query = "", status = "all" }, ref) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all jobs for the company
  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await fetchMyJobs();
      setJobs(Array.isArray(data) ? data : []); // Ensure array
    } catch (err) {
      const errorMsg = err?.response?.data?.detail || err.message || "Failed to load jobs!";
      toast.error(errorMsg);
      console.error("Error loading jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Allow parent to trigger reload
  useImperativeHandle(ref, () => ({ loadJobs }));

  useEffect(() => {
    loadJobs();
  }, []);

  // Delete a job
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteJob(id);
      toast.success("Job deleted successfully ✅");
      loadJobs();
    } catch (err) {
      const msg = err?.response?.data?.detail || "Error deleting job";
      toast.error(msg);
    }
  };

  // Toggle job status (active/closed)
  const toggleStatus = async (job) => {
    const newStatus = job.status === "active" ? "closed" : "active";
    try {
      await changeJobStatus(job._id, newStatus);
      toast.success(`Job marked as ${newStatus}`);
      loadJobs();
    } catch (err) {
      const msg = err?.response?.data?.detail || "Failed to update status";
      toast.error(msg);
    }
  };

  // Search + filter
  const normalizedQuery = (query || "").toLowerCase().trim();
  const filteredJobs = jobs.filter((job) => {
    const title = job.title?.toLowerCase() || "";
    const location = job.location?.toLowerCase() || "";
    const matchesQuery = !normalizedQuery || title.includes(normalizedQuery) || location.includes(normalizedQuery);
    const matchesStatus = status === "all" || (job.status || "active") === status;
    return matchesQuery && matchesStatus;
  });

  // --- Loading State ---
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
        <CircularProgress size={40} />
      </Box>
    );
  }

  // --- Empty State ---
  if (filteredJobs.length === 0) {
    return (
      <Box textAlign="center" py={6}>
        <Typography variant="h6" color="text.secondary">
          No jobs found.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try changing filters or create a new job posting.
        </Typography>
      </Box>
    );
  }

  // --- Main UI ---
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Job Management
        </Typography>
        <Tooltip title="Refresh">
          <IconButton onClick={loadJobs} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <TableContainer sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow
                key={job._id}
                hover
                sx={{
                  "&:hover": { backgroundColor: "#fafafa" },
                  transition: "background-color 0.2s ease-in-out",
                }}
              >
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>
                  <Chip
                    label={job.status || "active"}
                    color={job.status === "active" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    component={Link}
                    to={`/company/jobs/${job._id}`}
                    size="small"
                    variant="outlined"
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>

                  <Tooltip title="Toggle Status">
                    <IconButton
                      color={job.status === "active" ? "success" : "default"}
                      onClick={() => toggleStatus(job)}
                    >
                      <ToggleOnIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Job">
                    <IconButton color="error" onClick={() => handleDelete(job._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
});

export default JobManagementTable;
