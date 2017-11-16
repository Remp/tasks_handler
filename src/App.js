import React, { Component } from 'react';
import './styles/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import LoggedInLayout from './containers/LoggedInLayout';
import SessionStorage from './stores/SessionStore'
import PropTypes from 'prop-types';


class App extends Component {
  static contextTypes = {
    router: PropTypes.func.isRequired
  }

  componentDidMount(){
    if (!SessionStorage.isLoggedIn()){
      this.props.history.push('/login');
    }
    else{
      this.props.history.push('/lists');     
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <Switch>
            <Route path='/login' component={LoginPage}/>
            <Route path='/lists' render={() => {
              return !SessionStorage.isLoggedIn() ? <Redirect to='/login' /> : <LoggedInLayout />
              }}
            />
          </Switch>   
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
