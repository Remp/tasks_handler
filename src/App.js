import React, { Component } from 'react';
import './styles/App.css';
import LoginPage from './LoginPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <LoginPage />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
