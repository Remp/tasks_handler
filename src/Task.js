import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import TasksActions from './actions/TasksActions';
import './styles/Task.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';

class Task extends Component{
    constructor(){
        super();
        this.state = {
            txtValue: ''
        }
    }
    componentDidMount(){
        this.setState({txtValue: this.props.task.title});
    }
    onTaskChange_handler(){
        const task = this.props.task;
        task.status = task.status === 'completed' ? 'needsAction' : 'completed';
        task.title = this.state.txtValue;
        TasksActions.updateTask(task, this.props.listId);
    }
    toggle_handler(e){
        $(this.edit).slideToggle(200);
    }
    onChange_handler(e){
        this.setState({txtValue: e.target.value});
    }
    onDelete_handler(){
        TasksActions.deleteTask(this.props.task, this.props.listId);
    }
    render(){
        const { title } = this.props.task;
        const isChecked = this.props.task.status === 'completed';
        const style = {margin: '0 0.2rem'}
        return (
            <div className="task">
                <div className="task-content" >
                    <Checkbox style={{padding: '0 1rem', width: 'auto'}} onClick={() => this.onTaskChange_handler()} 
                        checked={isChecked}
                    />
                    <div className="text" onClick={(e) => this.toggle_handler(e)}>
                        {title}
                    </div>
                </div>
                <div className="task-edit" style={{display: 'none'}} ref={(el) => this.edit = el}>
                    <TextField floatingLabelText='Task edit' onChange={(e) => this.onChange_handler(e)} 
                        value={this.state.txtValue} 
                    />
                    <div className="btn-set">
                        <RaisedButton style={style} secondary={true} label='Delete' 
                            onClick={() => this.onDelete_handler()} 
                        />
                        <RaisedButton labelColor='white' style={style} backgroundColor="#a4c639" label='Submit' 
                            onClick={() => this.onTaskChange_handler()} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default Task;