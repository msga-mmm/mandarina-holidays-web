import { createTheme } from '@mui/material/styles';

const commonThemeOptions = {
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
};

export const lightTheme = createTheme({
  ...commonThemeOptions,
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
});

export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#f4a259',
      light: '#f7b97e',
      dark: '#d1863f',
      contrastText: '#2e1c0c'
    },
    secondary: {
      main: '#ffd49b',
      light: '#ffe0bd',
      dark: '#ccaa7c',
      contrastText: '#4a2a00'
    },
    background: {
      default: '#2e1c0c',
      paper: '#3f2a16'
    },
    text: {
      primary: '#fffaf3',
      secondary: '#f0d4b1'
    },
    divider: '#7a5a36'
  },
});
