import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// Helper to get auth headers
function authHeaders() {
	const token = localStorage.getItem("access_token");
	if (!token) {
		console.error("No access token found");
		throw new Error("Please log in first");
	}
	return { headers: { Authorization: `Bearer ${token}` } };
}

// Fetch company dashboard stats (jobs, applications, pipeline)
export const fetchCompanyStats = async () => {
	try {
		const [jobsRes, appsRes, pipelineRes] = await Promise.all([
			axios.get(`${API_BASE_URL}/company/jobs/stats`, authHeaders()),
			axios.get(`${API_BASE_URL}/company/applications/statistics`, authHeaders()),
			axios.get(`${API_BASE_URL}/company/applications/pipeline`, authHeaders()),
		]);

		const { total_jobs, active_jobs } = jobsRes.data;
		const { total_applications, hired_applications, average_scores_by_stage } = appsRes.data;
		const pipeline = pipelineRes.data;

		// Calculate ATS qualified rate (avg score of all applicants)
		const avgScores = average_scores_by_stage?.map((s) => s.average_score) || [];
		const avgScore = avgScores.length > 0 
			? Math.round(avgScores.reduce((a, b) => a + b, 0) / avgScores.length)
			: 0;

		// Build stats array matching StatWidget props - IconComponent is passed from dashboard
		return [
			{
				title: "Active Jobs",
				value: active_jobs || 0,
				trend: `Total: ${total_jobs || 0}`,
			},
			{
				title: "Total Applicants",
				value: total_applications || 0,
				trend: `Hired: ${hired_applications || 0}`,
			},
			{
				title: "ATS Qualified Rate",
				value: `${avgScore}%`,
				trend: avgScore >= 75 ? "Above avg." : avgScore >= 60 ? "Good" : "Below avg.",
			},
			{
				title: "Interviews Scheduled",
				value: pipeline?.Interview || 0,
				trend: "Next 7 days",
			},
		];
	} catch (err) {
		console.error("Error fetching company stats:", err);
		throw err.response?.data || err;
	}
};

// Fetch recent applications (last 5)
export const fetchRecentApplications = async () => {
	try {
		const res = await axios.get(`${API_BASE_URL}/company/applications/recent`, authHeaders());
		const apps = res.data.applications || [];
		return apps.map((app) => ({
			name: app.candidate_name || app.candidate_email?.split("@")[0] || "Unknown",
			job: app.job_title || "N/A",
			score: app.score || 0,
			date: app.applied_on ? new Date(app.applied_on).toLocaleDateString() : "N/A",
		}));
	} catch (err) {
		console.error("Error fetching recent applications:", err);
		throw err.response?.data || err;
	}
};

// Fetch pipeline data for charts
export const fetchPipelineData = async () => {
	try {
		const res = await axios.get(`${API_BASE_URL}/company/applications/pipeline`, authHeaders());
		return res.data;
	} catch (err) {
		console.error("Error fetching pipeline data:", err);
		throw err.response?.data || err;
	}
};

// Fetch company profile
export const fetchCompanyProfile = async () => {
	try {
		const res = await axios.get(`${API_BASE_URL}/company/profile`, authHeaders());
		return res.data;
	} catch (err) {
		console.error("Error fetching company profile:", err);
		throw err.response?.data || err;
	}
};

// Update company profile
export const updateCompanyProfile = async (profileData) => {
	try {
		const res = await axios.put(`${API_BASE_URL}/company/profile`, profileData, authHeaders());
		return res.data;
	} catch (err) {
		console.error("Error updating company profile:", err);
		throw err.response?.data || err;
	}
};

// Delete company profile
export const deleteCompanyProfile = async () => {
	try {
		const res = await axios.delete(`${API_BASE_URL}/company/profile`, authHeaders());
		return res.data;
	} catch (err) {
		console.error("Error deleting company profile:", err);
		throw err.response?.data || err;
	}
};

