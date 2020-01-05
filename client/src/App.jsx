import React, { Component } from 'react';
//import './App.css';
import Main from './components/Main';

import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <CssBaseline />
          <Main />
        </React.Fragment>
      </div>
    );
  }
}

export default App;
