// src/App.jsx (Updated with new component routes)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CompanyLayout from './layouts/CompanyLayout';
import CompanyDashboard from './pages/CompanyDashboard';
import JobManagement from './pages/JobManagement';
import CandidateScreening from './pages/CandidateScreening';
import JobPostForm from './pages/JobPostForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/company" element={<CompanyLayout />}>
          <Route index element={<CompanyDashboard />} />
          <Route path="jobs" element={<JobManagement />} />
          <Route path="jobs/new" element={<JobPostForm />} />
          <Route path="candidates" element={<CandidateScreening />} />
        </Route>
        <Route path="/student" element={<div>Student Dashboard - Coming Soon!</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;