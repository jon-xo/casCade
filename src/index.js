import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import { Cascade } from './components/Cascade';
import { ThemeProvider } from "@material-ui/core/styles";
import './index.css';
import theme from './theme';

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>      
      <Cascade />      
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);
