import React, { Component } from 'react';
import './styles/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import LoggedInLayout from './LoggedInLayout';
import SessionStorage from './stores/SessionStore'
import PropTypes from 'prop-types';


class App extends Component {
  static contextTypes = {
    router: PropTypes.func.isRequired
  }

  componentDidMount(){
    if (!SessionStorage.isLoggedIn()){
      this.context.router.history.push('/login');
    }
    else{
      this.context.router.history.push('/lists');     
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <Route path='/login' component={LoginPage}/>
          <Route path='/lists' render={() => {
            return !SessionStorage.isLoggedIn() ? <Redirect to='/login' /> : <LoggedInLayout />
          }}/>  
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
