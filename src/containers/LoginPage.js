import React, { Component } from 'react';
import SessionActions from '../actions/SessionActions';
import SessionStore from '../stores/SessionStore';
import PropTypes from 'prop-types';
import LoginPageComponent from '../containers/LoginPage'

class LoginPage extends Component{
    constructor(){
        super();
        this.state = {
            isLoggedIn: SessionStore.isLoggedIn()
        };
    }
    static contextTypes = {
        router: PropTypes.func.isRequired
    } 
    onChange_handler = () => {
        if (this.setState)
            this.setState({isLoggedIn: SessionStore.isLoggedIn()});
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
    click_handler(){
        SessionActions.authorize();
    }
    redirectLoggedInUser() {
        const { location } = this.props

        if (location.state && location.state.nextPathname) {
            this.context.router.history.replace(location.state.nextPathname);
        } else {
            this.context.router.history.replace('/lists');
        }
    }
    render(){
        return (
            <LoginPageComponent click_handler={() => this.click_handler()} />
        )
    }
}
export default LoginPage;