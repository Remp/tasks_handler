import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/LoginPage.css';
import desk from './img/desk.png';

class LoginPage extends Component{
    render(){
        return (
            <div className="login-page">
                <div className="content-text">
                    <h1>Welcome to task handler</h1>
                    <p>organise your life</p>
                    <RaisedButton onClick={() => this.props.click_handler()} 
                        className='btn' label='Log in with Google' 
                    />
                </div>
                <div className="content-img">
                    <img src={desk} alt="There's no grave"/>
                </div>
            </div>
        )
    }
}
export default LoginPage;