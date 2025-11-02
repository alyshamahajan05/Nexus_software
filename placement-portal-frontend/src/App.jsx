// src/App.jsx (Updated with new component routes)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CompanyLayout from './layouts/CompanyLayout';
import CompanyDashboard from './pages/CompanyDashboard';
import JobManagement from './pages/JobManagement';
import CandidateScreening from './pages/CandidateScreening';
import JobPostForm from './pages/JobPostForm';
import StudentLayout from './layouts/StudentLayout';
import StudentDashboard from './pages/StudentDashboard';
import ATSScanner from './pages/ATSScanner';
import JobRecommendations from './pages/JobRecommendations';
import StudentApplications from './pages/StudentApplications';
import StudentProfile from './pages/StudentProfile';
import Register from './pages/Register';
import JobDetails from './pages/JobDetails';
import CompanyProfile from './pages/CompanyProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/company" element={<CompanyLayout />}>
          <Route index element={<CompanyDashboard />} />
          <Route path="jobs" element={<JobManagement />} />
          <Route path="jobs/new" element={<JobPostForm />} />
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="candidates" element={<CandidateScreening />} />
          <Route path="profile" element={<CompanyProfile />} />
        </Route>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="ats-scanner" element={<ATSScanner />} />
          <Route path="jobs" element={<JobRecommendations />} />
          <Route path="applications" element={<StudentApplications />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;