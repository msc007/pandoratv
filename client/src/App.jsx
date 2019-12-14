import React, { Component } from 'react';
//import './App.css';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import CssBaseline from '@material-ui/core/CssBaseline';
import SiteTable from './components/SiteTable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <CssBaseline />
          <Header />
          <Main />
          <SiteTable />
          <Footer />
        </React.Fragment>
      </div>
    );
  }
}

export default App;
