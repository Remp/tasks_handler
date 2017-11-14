import React, { Component } from 'react';
import TasksActions from '../actions/TasksActions';
import TasksStore from '../stores/TasksStore';
import PropTypes from 'prop-types';
import TasksList_component from '../components/TasksList'

class TasksList extends Component{
    constructor(){
        super();
        this.state = {
            isAddingTask: false,
            tasks: TasksStore.getTasks(),
            isLoading: TasksStore.getState(),
            error: TasksStore.getError()
        }
    }
    onChange_handler = () => {
        this.setState({
            tasks: TasksStore.getTasks(),
            isLoading: TasksStore.getState(),
            error: TasksStore.getError()          
        })
    }
    componentDidMount(){
        TasksStore.addChangeListener(this.onChange_handler);
        this.onChange_handler();
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
        return (
            <TasksList_component 
                onClick_handler={() => this.onClick_handler()}
                currentName={this.props.currentName}
                onDelete={(listId) => this.props.onDelete(listId)}
                isLoading={this.state.isLoading}
                tasks={this.state.tasks}
                params={this.props.params}
                isAddingTask={this.state.isAddingTask}
                onSubmit={text => this.onSubmit_handler(text)}
                onClose={() => this.onClose_handler()}
                error={this.state.error}
            />
        )
    }
}
export default TasksList;