import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class TaskAddModal extends Component{
    constructor(){
        super();
        this.state = {
            text: ''
        }
    }
    onChangeTxt_handler(e){
        this.setState({text: e.target.value});
    }
    submit_handler(){
        if (this.props.onSubmit)
            this.props.onSubmit(this.state.text);
        this.setState({text: ''});
    }
    close_handler(){
        this.setState({text: ''});
        if (this.props.onClose)
            this.props.onClose();
    }
    render(){
        return (
            <Dialog style={{minWidth: '30rem', maxWidth: '100%'}} actions={[
                    <FlatButton label='Close' onTouchTap={() => this.close_handler()} />,
                    <FlatButton disabled={!this.state.text} label='Submit' 
                        onTouchTap={() => this.submit_handler()} 
                    />
                ]} open={this.props.isOpen} onRequestClose={() => this.close_handler()}
            >
                <h3>Add task</h3>
                <TextField fullWidth value={this.state.value} onChange={(e) => this.onChangeTxt_handler(e)}
                    ref={(el) => this.textInput = el} hintText='e.g. buy a bottle of milk' 
                    floatingLabelText='Entet task description' 
                />
            </Dialog>
        )
    }
}
export default TaskAddModal;