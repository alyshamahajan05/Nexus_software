// src/api/jobs.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const API_BASE = `${API_BASE_URL}/company/jobs`;

// 🔐 Helper to automatically attach Bearer token
function authHeaders() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.error("No access token found in localStorage");
    throw new Error("No access token found. Please log in first.");
  }
  return { headers: { Authorization: `Bearer ${token}` } };
}

// ✅ Fetch all jobs posted by the current company
export const fetchMyJobs = async () => {
  try {
    const res = await axios.get(`${API_BASE}/my-jobs`, authHeaders());
    return res.data.jobs || res.data || [];
  } catch (err) {
    console.error("Error fetching jobs:", err);
    if (err.response) {
      console.error("Response status:", err.response.status);
      console.error("Response data:", err.response.data);
    }
    if (err.message === "No access token found. Please log in first.") {
      throw new Error("Please log in first");
    }
    throw err.response?.data || err;
  }
};

// ✅ Post a new job
export const postJob = async (jobData) => {
  try {
    const res = await axios.post(`${API_BASE}/post`, jobData, authHeaders());
    return res.data;
  } catch (err) {
    console.error("Error posting job:", err);
    throw err.response?.data || err;
  }
};

// ✅ Update an existing job
export const updateJob = async (jobId, updatedData) => {
  try {
    const res = await axios.put(`${API_BASE}/update/${jobId}`, updatedData, authHeaders());
    return res.data;
  } catch (err) {
    console.error("Error updating job:", err);
    throw err.response?.data || err;
  }
};

// ✅ Delete a job
export const deleteJob = async (jobId) => {
  try {
    const res = await axios.delete(`${API_BASE}/delete/${jobId}`, authHeaders());
    return res.data;
  } catch (err) {
    console.error("Error deleting job:", err);
    throw err.response?.data || err;
  }
};

// ✅ Change job status (active / closed)
export const changeJobStatus = async (jobId, status) => {
  try {
    const res = await axios.patch(`${API_BASE}/status/${jobId}?status=${status}`, {}, authHeaders());
    return res.data;
  } catch (err) {
    console.error("Error changing job status:", err);
    throw err.response?.data || err;
  }
};

// ✅ (Optional) Fetch dashboard stats for recruiters
export const fetchJobStats = async () => {
  try {
    const res = await axios.get(`${API_BASE}/stats`, authHeaders());
    return res.data;
  } catch (err) {
    console.error("Error fetching job stats:", err);
    throw err.response?.data || err;
  }
};

// ✅ Fetch a single job by ID
export const fetchJobById = async (jobId) => {
  try {
    const res = await axios.get(`${API_BASE}/${jobId}`, authHeaders());
    return res.data;
  } catch (err) {
    console.error("Error fetching job:", err);
    throw err.response?.data || err;
  }
};
