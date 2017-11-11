import React, { Component } from 'react';
import './styles/LoggedInLayout.css';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import 'font-awesome/css/font-awesome.min.css';
import TasksListStore from './stores/TasksListStore';
import Subheader from 'material-ui/Subheader';
import TaskAddModal from './TaskAddModal';
import TaskListActions from './actions/TasksListActions';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import TasksList from './TasksList';

const HomeIcon = <FontIcon className="fa fa-home" />
const AskIcon = <FontIcon className="fa fa-question-circle-o"  />
const ExitIcon = <FontIcon className="fa fa-sign-out"  />
const FolderIcon = <FontIcon className="fa fa-folder" />
const PlusIcon = <FontIcon className="fa fa-plus" />

function getStateFromFlux(){
    return {
        tasksList: TasksListStore.getTasksList()
    }
}

class LoggedInLayout extends Component{
    constructor(){
        super();
        this.state = {
            tasksList: TasksListStore.getTasksList(),
            isCreatingTask: false,
        }
        this.current = '';
    }
    static contextTypes = {
        router: PropTypes.func.isRequired
    }
    onListChange = () => {
        this.setState({
            tasksList: TasksListStore.getTasksList()
        })
    }
    componentDidMount(){
        TasksListStore.addChangeListener(this.onListChange);
        this.onListChange();
    }
    componentWillUnmount(){
        TasksListStore.removeChangeListener(this.onListChange)        
    }
    itmClick_handler(id){
        this.context.router.history.push(`/lists/${id}`);
        const index = this.state.tasksList.findIndex((el) => {
            return el.id === id
        });
        this.current = this.state.tasksList[index].name;
    }
    imtAddClick_handler(){
        this.setState({isCreatingTask: true});
    }
    onSubmit_handler(text){
        TaskListActions.insertTasksList(text);
        this.setState({isCreatingTask: false});
    }
    onClose_handler(){
        this.setState({isCreatingTask: false});
    }
    onDelete_handler(id){
        TaskListActions.deleteTasksList(id);
        this.context.router.history.push('/lists')
    }
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
                                this.state.tasksList.map((el) => {
                                    return (
                                        <ListItem key={el.id} primaryText={el.name} leftIcon={FolderIcon} 
                                                    onClick={() => this.itmClick_handler(el.id)}/>
                                    )
                                })
                            }
                        </List>
                        <Divider />
                        <ListItem primaryText='New task' leftIcon={PlusIcon} onClick={() => this.imtAddClick_handler()}/>
                        <Divider />
                        <ListItem primaryText='Logout' leftIcon={ExitIcon} />
                    </List>
                </div>
                <div className="content">
                    <Route path="/lists/:listId" component={({match}) => <TasksList 
                                                                            onDelete={id => this.onDelete_handler(id)} 
                                                                            current={this.current} 
                                                                            params={match.params}
                                                                        />} 
                    />
                </div>
                <TaskAddModal isOpen={this.state.isCreatingTask} 
                    onSubmit={(text) => this.onSubmit_handler(text)}
                    onClose={() => this.onClose_handler()}
                />
            </div>
        )
    }
}
export default LoggedInLayout;