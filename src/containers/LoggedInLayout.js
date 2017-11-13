import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import TasksListStore from '../stores/TasksListStore';
import TaskListActions from '../actions/TasksListActions';
import PropTypes from 'prop-types';
import SessionStore from '../stores/SessionStore';
import LoggedInLayout_component from '../components/LoggedInLayout'

class LoggedInLayout extends Component{
    constructor(){
        super();
        this.state = {
            tasksList: TasksListStore.getTasksList(),
            isCreatingTask: false,
            currentId: '',
            currentName: ''
        }
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
        let current = this.state.tasksList[index].name;
        this.setState({
            currentId: id,
            currentName: current
        })
    }
    itmAddClick_handler(){
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
    onLogout_handler(){
        SessionStore.logout();
        this.context.router.history.push('/login');
    }
    render(){
        return (
            <LoggedInLayout_component 
                tasksList={this.state.tasksList}
                currentId={this.state.currentId}
                itmClick_handler={id => this.itmClick_handler(id)}
                itmAddClick_handler={() => this.itmAddClick_handler()}
                onLogout_handler={() => this.onLogout_handler()}
                onDelete_handler={id => this.onDelete_handler(id)}
                currentName={this.state.currentName}
                isCreatingTask={this.state.isCreatingTask}
                onSubmit_handler={text => this.onSubmit_handler(text)}
                onClose_handler={() => this.onClose_handler()}
            />
        )
    }
}
export default LoggedInLayout;