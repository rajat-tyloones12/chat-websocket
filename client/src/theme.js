// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#009688', // Teal color
    },
    secondary: {
      main: '#607d8b', // Grey color
    },
    senderMessage: {
      main: '#b2dfdb', // Light teal for sender messages
    },
    recipientMessage: {
      main: '#bdbdbd', // Light grey for recipient messages
    },
    background: {
      default: '#f5f5f5', // Light background
      paper: '#ffffff', // White background for paper components
    },
  },
});

export default theme;
