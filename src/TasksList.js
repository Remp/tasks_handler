import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import TasksActions from './actions/TasksActions';
import TasksStore from './stores/TasksStore';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import TaskAddModal from './TaskAddModal';
import PropTypes from 'prop-types';
import Task from './Task'

class TasksList extends Component{
    constructor(){
        super();
        this.state = {
            isAddingTask: false,
            tasks: TasksStore.getTasks()
        }
    }
    onChange_handler = () => {
        this.setState({
            tasks: TasksStore.getTasks()
        })
    }
    componentDidMount(){
        TasksStore.addChangeListener(this.onChange_handler);
    }
    componentWillUnmount(){
        TasksStore.removeChangeListener(this.onChange_handler);        
    }
    componentWillReceiveProps(nextP){
        let s =5;
        if (this.props.params.taskId !== nextP.params.taskId)
            TasksActions.getTasks(nextP.params.taskId);
    }
    componentWillMount(){
        TasksActions.getTasks(this.props.params.taskId);
    }
    onClick_handler(){
        this.setState({
            isAddingTask: true
        })
    }
    onSubmit_handler(text){
        TasksActions.insertTask({id: this.props.params.taskId, title: text});
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
            <div className="tasks-list">
                <div className="header">
                    <IconButton iconClassName='fa fa-plus' onClick={() => this.onClick_handler()}/>
                    <div className="title">Current tasks</div>
                </div>
                <div className='task-list'>
                    {
                        this.state.tasks.map((el) => {
                            if (el)
                                return (
                                    <Task key={el.id} text={el.text} isChecked={el.isCompleted} 
                                        id={el.id} listId={this.props.params.taskId}
                                    />   
                                )
                        })
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