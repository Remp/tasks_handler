import React, { Component } from 'react';
import TasksActions from '../actions/TasksActions';
import $ from 'jquery';
import TaskComponent from '../components/Task';

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
    toggle_handler(e, elem){
        $(elem).slideToggle(200);
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
        return(
            <TaskComponent 
                task={this.props.task}
                onTaskChange_handler={() => this.onTaskChange_handler()}
                toggle_handler={(e, elem) => this.toggle_handler(e, elem)}
                onDelete_handler={() => this.onDelete_handler()}
                onChange_handler={(e) => this.onChange_handler(e)}
                txtValue={this.state.txtValue}
                onChangeDesc_handler={e => this.onChangeDesc_handler(e)}
                txtDesc={this.state.txtDesc}
                onTaskSubmit_handler={() => this.onTaskSubmit_handler()}
            />
        )
    }
}
export default Task;