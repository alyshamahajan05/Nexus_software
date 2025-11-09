//
// FILE: placement-portal-frontend/src/api/student.js
//
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

/**
 * Helper to get auth headers.
 * This is *critical* for all protected requests.
 */
function authHeaders() {
	const token = localStorage.getItem("access_token");
	if (!token) {
		console.error("No access token found");
		// This will force a redirect to login if the token is missing
		window.location.href = "/login";
		throw new Error("No access token found");
	}
	return { headers: { Authorization: `Bearer ${token}` } };
}

// --- Profile Page & Layout ---
export const fetchStudentProfile = async () => {
    const res = await axios.get(`${API_BASE_URL}/student/profile`, authHeaders());
    return res.data;
};

// --- THIS IS THE UPDATED FUNCTION ---
export const updateStudentProfile = async (profileData) => {
    // It now sends *all* the fields from your new schema
    const res = await axios.put(`${API_BASE_URL}/student/profile`, profileData, authHeaders());
    return res.data;
};

// --- Job List Page ---
export const fetchAllActiveJobs = async () => {
    const res = await axios.get(`${API_BASE_URL}/student/jobs/`, authHeaders());
    return res.data; // This will return { jobs: [...] }
};

// --- Job Apply Button ---
export const applyForJob = async (jobId) => {
    const res = await axios.post(`${API_BASE_URL}/student/applications/apply/${jobId}`, {}, authHeaders());
    return res.data;
};

// --- Applications Page ---
export const fetchMyApplications = async () => {
    const res = await axios.get(`${API_BASE_URL}/student/applications/`, authHeaders());
    return res.data; // This will return { applications: [...] }
};