import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import LoginPage from './LoginPage';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SessionActions from './actions/SessionActions';
import { BrowserRouter, Route } from 'react-router-dom';
import LoggedInLayout from './LoggedInLayout';
import SessionStorage from './stores/SessionStore';

injectTapEventPlugin();

window.handleGoogleApiLoaded = () => {
  SessionActions.authorize(true, RenderApp());
}

const application = (
  <BrowserRouter>
    <Route path='/' component={App}>
      <Route path='/login' component={LoginPage}/>
      <Route path='/lists' component={LoggedInLayout} onEnter={onEnter_handler}>
      </Route>
    </Route>
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
}
