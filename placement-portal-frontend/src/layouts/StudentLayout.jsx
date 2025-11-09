//
// FILE: placement-portal-frontend/src/layouts/StudentLayout.jsx
//
import React, { useEffect, useState } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Avatar,
  Button,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { fetchStudentProfile } from '../api/student'; // <-- 1. IMPORT

const drawerWidth = 240;

const navItems = [
  { name: 'Dashboard', path: '/student' },
  { name: 'ATS Scanner', path: '/student/ats-scanner' },
  { name: 'Job Recommendations', path: '/student/jobs' },
  { name: 'My Applications', path: '/student/applications' },
  { name: 'Profile', path: '/student/profile' },
];

function StudentLayout() {
  const navigate = useNavigate();
  // 2. ADD STATE to store the user's profile
  const [profile, setProfile] = useState(null);

  const handleLogout = () => {
    try {
      localStorage.clear();
    } catch (_) {
      // ignore storage errors
    }
    navigate('/login', { replace: true });
  };

  // 3. ADD USEEFFECT to fetch the profile
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login', { replace: true });
      return; // Stop if no token
    }

    const loadProfile = async () => {
      try {
        const data = await fetchStudentProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile for layout", err);
        // If the token is bad, force a re-login
        if (err.response && (err.response.status === 401 || err.response.status === 404)) {
            handleLogout();
        }
      }
    };
    loadProfile();
  }, [navigate]); // Add navigate to dependency array

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Header */}
      <AppBar
        position="fixed"
        color="inherit"
        elevation={1}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'background.paper' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
            Placement Portal
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            {/* 4. MAKE THE HEADER DYNAMIC */}
            <Typography variant="body2" color="text.secondary">
              {profile ? profile.name : 'Loading...'}
            </Typography>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
              {profile ? profile.name[0].toUpperCase() : 'S'}
            </Avatar>
            <Button variant="outlined" size="small" startIcon={<LogoutIcon />} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Sidebar (No changes needed) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(180deg, #ffffff 0%, #f0f4ff 100%)',
          },
        }}
      >
        <Toolbar /> {/* This pushes content down below the AppBar */}
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton component={Link} to={item.path} sx={{ borderRadius: 1, mx: 1, my: 0.5 }}>
                  <ListItemText primaryTypographyProps={{ fontWeight: 600 }} primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      
      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar /> {/* Spacer for the fixed AppBar */}
        <Outlet /> {/* This renders the content of the nested route (e.g., StudentDashboard) */}
      </Box>
    </Box>
  );
}

export default StudentLayout;