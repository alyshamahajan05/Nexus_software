// src/pages/JobPostForm.jsx
import React, { useState } from "react";
import { Box, Typography, Paper, TextField, Button, MenuItem } from "@mui/material";
import toast from "react-hot-toast";
import { postJob } from "../api/jobs";

function JobPostForm({ onJobPosted }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills_required: "",
    experience_level: "",
    status: "active", // default backend value
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        salary: formData.salary?.trim() || undefined,
        experience_level: formData.experience_level || undefined,
        status: formData.status || "active",
        skills_required: formData.skills_required
          ? formData.skills_required.split(",").map((s) => s.trim())
          : [],
      };

      await postJob(payload);
      toast.success("Job posted successfully 🚀");

      setFormData({
        title: "",
        description: "",
        location: "",
        salary: "",
        skills_required: "",
        experience_level: "",
        status: "active",
      });

      if (onJobPosted) onJobPosted();
    } catch (err) {
      console.error(err);
      toast.error("Error posting job");
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Post New Job 🚀
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h6" mb={3}>
          Enter Job Details
        </Typography>

        <TextField
          label="Job Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Job Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Salary (Optional)"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Experience Level"
          name="experience_level"
          value={formData.experience_level}
          onChange={handleChange}
          select
          fullWidth
          margin="normal"
        >
          <MenuItem value="">Select experience level</MenuItem>
          <MenuItem value="Fresher">Fresher</MenuItem>
          <MenuItem value="Junior">Junior</MenuItem>
          <MenuItem value="Mid-Level">Mid-Level</MenuItem>
          <MenuItem value="Senior">Senior</MenuItem>
          <MenuItem value="Lead">Lead</MenuItem>
        </TextField>

        <TextField
          label="Key Requirements (comma separated)"
          name="skills_required"
          value={formData.skills_required}
          onChange={handleChange}
          multiline
          rows={2}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          color="primary"
          onClick={handleSubmit}
        >
          Save & Publish
        </Button>
      </Paper>
    </Box>
  );
}

export default JobPostForm;
