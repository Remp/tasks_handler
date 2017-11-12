import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import TasksActions from './actions/TasksActions';
import TasksStore from './stores/TasksStore';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import TaskAddModal from './TaskAddModal';
import PropTypes from 'prop-types';
import Task from './Task';
import './styles/TasksList.css';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

class TasksList extends Component{
    constructor(){
        super();
        this.state = {
            isAddingTask: false,
            tasks: TasksStore.getTasks(),
            isLoading: TasksStore.getState()
        }
    }
    onChange_handler = () => {
        this.setState({
            tasks: TasksStore.getTasks(),
            isLoading: TasksStore.getState()
        })
    }
    componentDidMount(){
        TasksStore.addChangeListener(this.onChange_handler);
    }
    componentWillUnmount(){
        TasksStore.removeChangeListener(this.onChange_handler);        
    }
    componentWillReceiveProps(nextP){
        if (this.props.params.taskId !== nextP.params.listId)
            TasksActions.getTasks(nextP.params.listId);
    }
    componentWillMount(){
        TasksActions.getTasks(this.props.params.listId);
    }
    onClick_handler(){
        this.setState({
            isAddingTask: true
        })
    }
    onSubmit_handler(text){
        TasksActions.insertTask({id: this.props.params.listId, title: text});
        this.setState({
            isAddingTask: false
        })
    }
    onClose_handler(){
        this.setState({
            isAddingTask: false
        })
    }
    render(){
        const listId = this.props.params.listId
        return (
            <div className="tasks-list">
                <div className="header">
                    <IconButton iconClassName='fa fa-plus' onClick={() => this.onClick_handler()}/>
                    <div className="title">{this.props.current}</div>
                    <RaisedButton secondary={true} label='Delete' 
                        onClick={() => this.props.onDelete(listId)} 
                    />
                </div>
                <div className='content'>
                    {
                        !this.state.isLoading ? this.state.tasks.map((el) => {
                            if (el)
                                return (
                                    <Task key={el.id} task={el} listId={this.props.params.listId}/>   
                                )
                        }) : <CircularProgress />
                    }
                </div>
                <TaskAddModal isOpen={this.state.isAddingTask} 
                    onSubmit={(text) => this.onSubmit_handler(text)}
                    onClose={() => this.onClose_handler()}
                />
            </div>
        )
    }
}
export default TasksList;