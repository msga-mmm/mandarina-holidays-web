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
      main: '#F28C28',
      light: '#FFAC5C',
      dark: '#D26D17',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#FFD180',
      light: '#FFE4AE',
      dark: '#FFB852',
      contrastText: '#3F2A16'
    },
    background: {
      default: '#FFF8E1',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#3F2A16',
      secondary: '#7A5A36'
    },
    divider: '#E0E0E0'
  },
});

export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFB852',
      light: '#FFD180',
      dark: '#D26D17',
      contrastText: '#000000'
    },
    secondary: {
      main: '#FFA726',
      light: '#FFC66D',
      dark: '#CC7D00',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#1E1E1E',
      paper: '#2C2C2C'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#BBBBBB'
    },
    divider: '#424242'
  },
});
