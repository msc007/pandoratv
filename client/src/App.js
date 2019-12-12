import React, { Component } from 'react';
//import './App.css';
import Customers from './components/customers';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <CssBaseline />
          <Header />
          <Main />
          <Footer />
        </React.Fragment>
      </div>
    );
  }
}

export default App;
