import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import TasksActions from './actions/TasksActions';
import './styles/Task.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import IconButton from 'material-ui/IconButton';

class Task extends Component{
    constructor(){
        super();
        this.state = {
            txtValue: '',
            txtDesc: ''
        }
    }
    componentDidMount(){
        this.setState({
            txtValue: this.props.task.title, 
            txtDesc: this.props.task.notes
        });
    }
    onTaskChange_handler(){
        const task = this.props.task;
        task.status = task.status === 'completed' ? 'needsAction' : 'completed';
        TasksActions.updateTask(task, this.props.listId);
    }
    onTaskSubmit_handler(){
        const task = this.props.task;
        task.title = this.state.txtValue;
        task.notes = this.state.txtDesc;
        TasksActions.updateTask(task, this.props.listId);
    }
    toggle_handler(e){
        $(this.edit).slideToggle(200);
    }
    onChange_handler(e){
        this.setState({txtValue: e.target.value});
    }
    onChangeDesc_handler(e){
        this.setState({txtDesc: e.target.value})
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
                    <IconButton iconClassName='fa fa-trash' onClick={() => this.onDelete_handler()} 
                        hoveredStyle={{color: 'red'}}
                    />
                </div>
                <div className="task-edit" style={{display: 'none'}} ref={(el) => this.edit = el}>
                    <TextField style={{width: 'auto'}} floatingLabelText='Task name' 
                        onChange={(e) => this.onChange_handler(e)} 
                        value={this.state.txtValue} 
                    />
                    <TextField style={{width: 'auto'}} floatingLabelText='Task description' 
                        onChange={e => this.onChangeDesc_handler(e)}
                        value={this.state.txtDesc} multiLine={true} rows={3} rowsMax={5}
                    />
                    <div className="btn-set">
                        <RaisedButton labelColor='white' style={style} backgroundColor="#a4c639" label='Submit' 
                            onClick={() => this.onTaskSubmit_handler()} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default Task;