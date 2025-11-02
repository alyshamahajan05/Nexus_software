import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const registerCompany = async ({ name, email, password }) => {
  const res = await axios.post(`${API_BASE_URL}/company/register`, { name, email, password });
  return res.data;
};

export const loginCompany = async ({ email, password }) => {
  const res = await axios.post(`${API_BASE_URL}/company/login`, { email, password });
  return res.data; // { access_token, token_type }
};

export const registerStudent = async ({ name, email, password }) => {
  const res = await axios.post(`${API_BASE_URL}/student/register`, { name, email, password });
  return res.data;
};

export const loginStudent = async ({ email, password }) => {
  const res = await axios.post(`${API_BASE_URL}/student/login`, { email, password });
  return res.data;
};



