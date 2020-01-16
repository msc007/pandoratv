import React, { Component } from 'react';
import Main from './components/Main';
import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

// For Responsive Typography
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Main />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
