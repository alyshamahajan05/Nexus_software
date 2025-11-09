import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const registerCompany = async ({ name, email, password }) => {
  const res = await axios.post(`${API_BASE_URL}/company/register`, { name, email, password });
  return res.data;
};

export const loginCompany = async ({ email, password }) => {
    // 1. Create FormData using URLSearchParams (the standard browser API)
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    // 2. Send as form data with the correct content-type
    const res = await axios.post(`${API_BASE_URL}/company/login`, formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return res.data;
};

export const registerStudent = async ({ name, email, password }) => {
  const res = await axios.post(`${API_BASE_URL}/student/register`, { name, email, password });
  return res.data;
};

export const loginStudent = async ({ email, password }) => {
    // 1. Create FormData
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    // 2. Send as form data
    const res = await axios.post(`${API_BASE_URL}/student/login`, formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return res.data;
};



