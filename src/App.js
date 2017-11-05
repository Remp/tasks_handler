import React, { Component } from 'react';
import './styles/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import LoggedInLayout from './LoggedInLayout';
import SessionStorage from './stores/SessionStore'


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <Route path='/login' component={LoginPage}/>
          <Route path='/lists' component={LoggedInLayout} onEnter={onEnter_handler}/>  
        </div>
      </MuiThemeProvider>
    );
  }
}
function onEnter_handler(nextS, replace){
  if (!SessionStorage.isLoggedIn()){
    replace({
      pathname: '/login',
      state: { nextPathbane: nextS.location.pathname }
    })
  }
}
export default App;
