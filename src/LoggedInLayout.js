import React, { Component } from 'react';
import './styles/LoggedInLayout.css';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import 'font-awesome/css/font-awesome.min.css';

const HomeIcon = <FontIcon className="fa fa-home" hoverColor={red500} />
const AskIcon = <FontIcon className="fa fa-question-circle-o" hoverColor={red500} />
const ExitIcon = <FontIcon className="fa fa-sign-out" hoverColor={red500} />

class LoggedInLayout extends Component{
    render(){
        return (
            <div className="logged-in-layout">
                <div className="navbar">
                    <List className='list'>
                        <h3>Tasks handler</h3>
                        <Divider />
                        <ListItem primaryText='Home' leftIcon={HomeIcon}/>
                        <ListItem primaryText='About' leftIcon={AskIcon}/>
                        <Divider />
                        <List className='task-list'>

                        </List>
                        <ListItem primaryText='Logout' leftIcon={ExitIcon} />
                    </List>
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default LoggedInLayout;