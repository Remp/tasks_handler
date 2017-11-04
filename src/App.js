import React, { Component } from 'react';
import './styles/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
