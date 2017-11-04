import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import './styles/LoginPage.css';
import desk from './img/desk.png';
import SessionActions from './actions/SessionActions';
import SessionStore from './stores/SessionStore';

function getStateFromFlux(){
    return SessionStore.isLoggedIn();
}

class LoginPage extends Component{
    constructor(){
        super();
        this.state = {
            isLoggedIn: getStateFromFlux()
        };
    }
    onChange_handler(){
        this.setState(getStateFromFlux());
    }
    componentDidMount(){
        SessionStore.addChangeListener(this.onChange_handler);
    }
    componentWillUnmount(){
        SessionStore.removeChangeListener(this.onChange_handler);
    }
    componentWillUpdate(nextP, nextS){
        // если залогинен тогда переводим на главную страницу
        if (nextS.isLoggedIn)
            this.redirectLoggedInUser();
    }
    click_handler(e){
        SessionActions.authorize();
    }
    redirectLoggedInUser() {
        const { location } = this.props

        if (location.state && location.state.nextPathname) {
            this.context.router.replace(location.state.nextPathname);
        } else {
            this.context.router.replace('/lists');
        }
    }
    render(){
        return (
            <div className="login-page">
                <div className="content-text">
                    <h1>Welcome to task handler</h1>
                    <p>organise your life</p>
                    <RaisedButton onClick={(e) => this.click_handler(e)} className='btn' label='Log in with Google' />
                </div>
                <div className="content-img">
                    <img src={desk} alt="There's no grave"/>
                </div>
            </div>
        )
    }
}
export default LoginPage;