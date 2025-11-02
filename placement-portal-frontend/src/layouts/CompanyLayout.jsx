// src/layouts/CompanyLayout.jsx
import React, { useEffect } from 'react';
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

const drawerWidth = 240;

const navItems = [
  { name: 'Dashboard', path: '/company' },
  { name: 'Jobs', path: '/company/jobs' },
  { name: 'Post Job', path: '/company/jobs/new' },
  { name: 'Candidates', path: '/company/candidates' },
  { name: 'Profile', path: '/company/profile' },
];

function CompanyLayout() {
  const navigate = useNavigate();

  // ✅ Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // ✅ Get stored company info (optional)
  const company = JSON.parse(localStorage.getItem('company') || '{}');

  const handleLogout = () => {
    try {
      localStorage.clear();
    } catch (_) {
      // ignore localStorage errors
    }
    navigate('/login', { replace: true });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* --- Header --- */}
      <AppBar
        position="fixed"
        color="inherit"
        elevation={1}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 700, color: 'primary.main' }}
          >
            Placement Portal
          </Typography>

          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2" color="text.secondary">
              {company?.name || 'Recruiter'}
            </Typography>
            <Avatar sx={{ width: 32, height: 32 }}>
              {(company?.name?.[0] || 'R').toUpperCase()}
            </Avatar>
            <Button
              variant="outlined"
              size="small"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* --- Sidebar --- */}
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
            background: 'linear-gradient(180deg, #ffffff 0%, #f7f8fc 100%)',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{ borderRadius: 1, mx: 1, my: 0.5 }}
                >
                  <ListItemText
                    primaryTypographyProps={{ fontWeight: 600 }}
                    primary={item.name}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* --- Main Content Area --- */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet /> {/* Renders nested routes (e.g., Dashboard, Job pages) */}
      </Box>
    </Box>
  );
}

export default CompanyLayout;
