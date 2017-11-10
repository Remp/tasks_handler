import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import TasksActions from './actions/TasksActions';
import './styles/Task.css';

class Task extends Component{
    onTaskChange_handler(){
        const task = this.props.task;
        task.status = task.status === 'completed' ? 'needsAction' : 'completed';
        TasksActions.updateTask(task, this.props.listId);
    }
    render(){
        const { title } = this.props.task;
        const isChecked = this.props.task.status === 'completed';
        return (
            <div className="task">
                <Checkbox style={{padding: '0 1rem', width: 'auto'}} onClick={() => this.onTaskChange_handler()} checked={isChecked}/>
                <div className="text">
                    {title}
                </div>
            </div>
        )
    }
}
export default Task;