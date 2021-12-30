import React from 'react';
import './App.css';
import { ThemeProvider, makeStyles } from '@mui/styles';
import { createTheme, CssBaseline } from '@mui/material';
import Tasks from './tasks/tasks'
import Appbar from './components/appbar';
import Sidebar from './components/sidebar';

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  }
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
      <div className={classes.appMain}>
        <Appbar />

        <Tasks />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
