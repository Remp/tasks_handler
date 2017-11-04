import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SessionActions from './actions/SessionActions';

injectTapEventPlugin();

window.handleGoogleApiLoaded = () => {
  SessionActions.authorize(true, RenderApp());
}

function RenderApp(){
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();  
}
