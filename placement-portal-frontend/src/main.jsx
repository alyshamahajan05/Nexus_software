import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider, CssBaseline } from '@mui/material'
import defaultTheme, { ThemeModeProvider } from './theme/index.jsx'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeModeProvider>
      {(theme) => (
        <ThemeProvider theme={theme || defaultTheme}>
          <CssBaseline />
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: theme?.palette?.background?.paper || '#fff',
                color: theme?.palette?.text?.primary || '#333',
                border: `1px solid ${theme?.palette?.divider || '#e0e0e0'}`,
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              },
            }}
          />
        </ThemeProvider>
      )}
    </ThemeModeProvider>
  </StrictMode>,
)
