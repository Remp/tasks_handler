import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import TasksActions from './actions/TasksActions';
import TasksStore from './stores/TasksStore';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import TaskAddModal from './TaskAddModal';

class TasksList extends Component{
    constructor(){
        super();
        this.state = {
            isAddingTask: false,
            tasks: TasksStore.getTasks()
        }
    }
    onChange_handler(){
        this.setState({
            tasks: TasksStore.getTasks()
        })
    }
    componentDidMount(){
        TasksStore.addChangeListener(() => this.onChange_handler());
    }
    componentWillUnmount(){
        TasksStore.removeChangeListener(() => this.onChange_handler());        
    }
    componentWillReceiveProps(nextP){
        if (this.props.currentId !== nextP.currentId)
            TasksActions.getTasks(nextP.currentId);
    }
    componentWillMount(){
        TasksActions.getTasks(this.props.currentId);
    }
    onClick_handler(){
        this.setState({
            isAddingTask: true
        })
    }
    onSubmit_handler(text){
        TasksActions.insertTask({id: this.props.currentId, title: text});
        this.setState({
            isAddingTask: false
        })
    }
    onClose_handler(){
        this.setState({
            isAddingTask: true
        })
    }
    render(){
        return (
            <div className="tasks-list">
                <div className="header">
                    <IconButton iconClassName='fa fa-plus' onClick={() => this.onClick_handler()}/>
                    <div className="title">Current tasks</div>
                </div>
                <List>
                    {
                        this.state.tasks.map((el) => {
                            return (
                                <ListItem key={el.id} primaryText={el.text}
                                    leftCheckbox={<Checkbox checked={el.isCompleted} />}    
                                />
                            )
                        })
                    }
                </List>
                <TaskAddModal isOpen={this.state.isAddingTask} 
                    onSubmit={(text) => this.onSubmit_handler(text)}
                    onClose={() => this.onClose_handler()}
                />
            </div>
        )
    }
}
export default TasksList;