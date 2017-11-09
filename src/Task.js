import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import TasksActions from './actions/TasksActions';

class Task extends Component{
    onTaskChange_handler(){
        TasksActions.updateTask({
            tListId: this.props.listId,
            id: this.props.id,
            isChecked: !this.props.isChecked,
            text: this.props.text
        });
    }
    render(){
        return (
            <div className="task">
                <Checkbox onClick={() => this.onTaskChange_handler()} checked={this.props.isChecked}/>
                <div className="text">
                    {this.props.text}
                </div>
            </div>
        )
    }
}
export default Task;