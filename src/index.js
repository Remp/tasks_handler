import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import LoginPage from './LoginPage';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SessionActions from './actions/SessionActions';
import TasksListActions from './actions/TasksListActions'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LoggedInLayout from './LoggedInLayout';
import SessionStorage from './stores/SessionStore';

injectTapEventPlugin();

window.handleGoogleApiLoaded = () => {
  SessionActions.authorize(true, () => TasksListActions.getTasksList(RenderApp()));
}

const application = (
  <BrowserRouter>
    <Route path='/' component={App} onEnter={onEnter_handler}/>
  </BrowserRouter>
)
function RenderApp(){
  ReactDOM.render(application, document.getElementById('root'));
  registerServiceWorker();  
}
// если пользователь не залогинен тогда не давать доступ к LoggedInLayout
function onEnter_handler(nextS, replace){
  if (!SessionStorage.isLoggedIn()){
    replace({
      pathname: '/login',
      state: { nextPathbane: nextS.location.pathname }
    })
  } 
  else{
    replace({
      pathname: '/lists',
    })
  }
}
