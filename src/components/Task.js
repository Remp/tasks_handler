import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import '../styles/Task.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

class Task extends Component{
    render(){
        const { title } = this.props.task;
        const isChecked = this.props.task.status === 'completed';
        const style = {margin: '0 0.2rem'}
        return (
            <div className="task">
                <div className="task-content" >
                    <Checkbox style={{padding: '0 1rem', width: 'auto'}} onClick={() => this.props.onTaskChange_handler()} 
                        checked={isChecked}
                    />
                    <div className="text" onClick={(e) => this.props.toggle_handler(e, this.edit)}>
                        {title}
                    </div>
                    <IconButton iconClassName='fa fa-trash' onClick={() => this.props.onDelete_handler()} 
                        hoveredStyle={{color: 'red'}}
                    />
                </div>
                <div className="task-edit" style={{display: 'none'}} ref={(el) => this.edit = el}>
                    <TextField style={{width: 'auto'}} floatingLabelText='Task name' 
                        onChange={(e) => this.props.onChange_handler(e)} 
                        value={this.props.txtValue} 
                    />
                    <TextField style={{width: 'auto'}} floatingLabelText='Task description' 
                        onChange={e => this.props.onChangeDesc_handler(e)}
                        value={this.props.txtDesc} multiLine={true} rows={3} rowsMax={5}
                    />
                    <div className="btn-set">
                        <RaisedButton labelColor='white' style={style} backgroundColor="#a4c639" label='Submit' 
                            onClick={() => this.props.onTaskSubmit_handler()} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default Task;