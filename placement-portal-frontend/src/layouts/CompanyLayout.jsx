// src/layouts/CompanyLayout.jsx
import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Avatar, IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '../theme/index.jsx';
import { Outlet, Link } from 'react-router-dom';

const drawerWidth = 240;

const navItems = [
  { name: 'Dashboard', path: '/company' },
  { name: 'Jobs', path: '/company/jobs' },
  { name: 'Candidates', path: '/company/candidates' },
  // ... more items
];

function CompanyLayout() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const isDark = theme.palette.mode === 'dark';
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
            <IconButton onClick={toggleColorMode} color="inherit" aria-label="Toggle theme">
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <Typography variant="body2" color="text.secondary">Recruiter</Typography>
            <Avatar sx={{ width: 32, height: 32 }}>R</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Sidebar */}
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
        <Outlet /> {/* This renders the content of the nested route (e.g., CompanyDashboard) */}
      </Box>
    </Box>
  );
}

export default CompanyLayout;