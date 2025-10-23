// src/theme/index.jsx
import { createTheme } from '@mui/material/styles';
import React, { createContext, useMemo, useState, useContext } from 'react';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useColorMode() {
  return useContext(ColorModeContext);
}

function buildTheme(mode) {
  return createTheme({
    palette: {
      mode,
      primary: { main: '#5B6CFF' },
      secondary: { main: '#7C4DFF' },
      background: mode === 'light'
        ? { default: '#F7F8FC', paper: '#FFFFFF' }
        : { default: '#0F1222', paper: '#14172B' },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      h4: { fontWeight: 700 },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { borderRadius: 16 },
        },
        defaultProps: { elevation: 2 },
      },
      MuiButton: {
        styleOverrides: { root: { textTransform: 'none', fontWeight: 600, borderRadius: 10 } },
      },
    },
  });
}

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({ toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')) }),
    []
  );
  const theme = useMemo(() => buildTheme(mode), [mode]);
  return (
    <ColorModeContext.Provider value={colorMode}>{children(theme)}</ColorModeContext.Provider>
  );
}

export default buildTheme('light');