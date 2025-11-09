import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// 2. Create a helper function to get auth headers
function authHeaders() {
    const token = localStorage.getItem("access_token");
    if (!token) {
        console.error("No access token found");
        // You might want to redirect to login here
        throw new Error("No access token found");
    }
    return { headers: { Authorization: `Bearer ${token}` } };
}

// 3. Implement the API functions

// For StudentProfile.jsx
export const fetchStudentProfile = async () => {
    const res = await axios.get(`${API_BASE_URL}/student/profile`, authHeaders());
    return res.data;
};

export const updateStudentProfile = async (profileData) => {
    const res = await axios.put(`${API_BASE_URL}/student/profile`, profileData, authHeaders());
    return res.data;
};

// For JobRecommendations.jsx
export const fetchAllActiveJobs = async () => {
    const res = await axios.get(`${API_BASE_URL}/student/jobs/`, authHeaders());
    return res.data;
};

// For the "Apply" button
export const applyForJob = async (jobId) => {
    const res = await axios.post(`${API_BASE_URL}/student/applications/apply/${jobId}`, {}, authHeaders());
    return res.data;
};

// For StudentApplications.jsx
export const fetchMyApplications = async () => {
    const res = await axios.get(`${API_BASE_URL}/student/applications/my-applications`, authHeaders());
    return res.data;
};
