import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import TaskAddModal from '../containers/TaskAddModal';
import Task from '../containers/Task';
import '../styles/TasksList.css';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

class TasksList extends Component{
    render(){
        const listId = this.props.params.listId;
        const content = this.props.error ? (
            <div className='error-message'>{this.props.error}</div>
        ) :
        this.props.tasks.map((el) => {
            if (el)
                return (
                    <Task key={el.id} task={el} listId={this.props.params.listId}/>   
                )
        });
        return (
            <div className="tasks-list">
                <div className="header">
                    <IconButton iconClassName='fa fa-plus' onClick={() => this.props.onClick_handler()}/>
                    <div className="title">{this.props.currentName}</div>
                    <RaisedButton secondary={true} label='Delete' 
                        onClick={() => this.props.onDelete(listId)} 
                    />
                </div>
                <div className='content'>
                    {
                        !this.props.isLoading ? 
                        content : 
                        <CircularProgress style={{alignSelf: 'center', marginTop: '10vh'}} 
                            size={60} thickness={6}
                        />
                    }
                </div>
                <TaskAddModal isOpen={this.props.isAddingTask} 
                    onSubmit={(text) => this.props.onSubmit(text)}
                    onClose={() => this.props.onClose()}
                />
            </div>
        )
    }
}
export default TasksList;