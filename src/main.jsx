import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import './i18n';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e67e22',
      light: '#f4a259',
      dark: '#c96a14',
      contrastText: '#fffaf3'
    },
    secondary: {
      main: '#ffb65c',
      light: '#ffd49b',
      dark: '#e6902d',
      contrastText: '#4a2a00'
    },
    background: {
      default: '#fff7ee',
      paper: '#fffdf9'
    },
    text: {
      primary: '#3f2a16',
      secondary: '#7a5a36'
    },
    divider: '#f0d4b1'
  },
  shape: {
    borderRadius: 10
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600
        }
      }
    }
  }
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
