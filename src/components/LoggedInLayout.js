import React, { Component } from 'react';
import '../styles/LoggedInLayout.css';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import 'font-awesome/css/font-awesome.min.css';
import Subheader from 'material-ui/Subheader';
import TaskAddModal from '../containers/TaskAddModal';
import { Route } from 'react-router-dom';
import TasksList from '../containers/TasksList';

const HomeIcon = <FontIcon className="fa fa-home" />
const AskIcon = <FontIcon className="fa fa-question-circle-o" />
const ExitIcon = <FontIcon className="fa fa-sign-out" />
const FolderIcon = <FontIcon className="fa fa-folder" />
const PlusIcon = <FontIcon className="fa fa-plus" />
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
                        <Subheader style={{paddingLeft: '1rem'}} inset={true}>Tasks list</Subheader>
                        <List className='task-list'>
                            {
                                this.props.tasksList.map((el) => {
                                    return (
                                        <div key={el.id} style={el.id === this.props.currentId ? 
                                            {backgroundColor: 'rgba(117, 117, 117, 0.1)'} : {backgroundColor: ''}}>
                                            <ListItem  primaryText={el.name} leftIcon={FolderIcon} 
                                                onClick={() => this.props.itmClick_handler(el.id)}                       
                                            />
                                        </div>
                                        
                                    )
                                })
                            }
                        </List>
                        <Divider />
                        <ListItem primaryText='New task' leftIcon={PlusIcon} 
                            onClick={() => this.props.imtAddClick_handler()}
                        />
                        <Divider />
                        <ListItem primaryText='Logout' onClick={() => this.props.onLogout_handler()} 
                            leftIcon={ExitIcon} 
                        />
                    </List>
                </div>
                <div className="content">
                    <Route path="/lists/:listId" component={({match}) => <TasksList 
                                                                            onDelete={id => this.props.onDelete_handler(id)} 
                                                                            currentName={this.props.currentName} 
                                                                            params={match.params}
                                                                        />} 
                    />
                </div>
                <TaskAddModal isOpen={this.props.isCreatingTask} 
                    onSubmit={(text) => this.props.onSubmit_handler(text)}
                    onClose={() => this.props.onClose_handler()}
                />
            </div>
        )
    }
}
export default LoggedInLayout;