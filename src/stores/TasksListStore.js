import AppConstants from '../constants/AppContants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const  CHANGE_EVENT = 'change';

let _tasks_list = [];
let _error = null;
function deifyError(task){
    if (task.code){
        _error = task.code === '400' ? 'Failed tasklist download' : 'Occured some problem'
        return true;        
    }
    else{
        _error = null;     
        return false;   
    }
}

function formatData(data){
    return {
        id: data.id,
        name: data.title
    }
}

const TasksListStore = Object.assign({}, EventEmitter.prototype, {
    getTasksList(){
        return _tasks_list;
    },
    getError(){
        return _error;
    },
    emitChange(){
        this.emit(CHANGE_EVENT)
    },
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback)
    },
    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback)
    }
});
AppDispatcher.register(action => {
    switch(action.type){
        case AppConstants.TASKS_LIST_LOAD_SUCCESS: {
            if (deifyError(action.items)){
                _tasks_list = [];
                TasksListStore.emitChange();                                
                break;   
            }
            _tasks_list = action.items.map(formatData);
            TasksListStore.emitChange();
            break;
        }
        case AppConstants.TASKS_LIST_LOAD_FAIL: {
            _tasks_list = [];
            _error = action.error;
            break;
        }
        case AppConstants.TASKS_LIST_INSERT_SUCCESS: {
            const newList = formatData(action.taskList);
            _tasks_list.push(newList);
            TasksListStore.emitChange();
            break;
        }
        case AppConstants.TASKS_LIST_INSERT_FAIL: {
            _error = action.error;
            break;
        }
        case AppConstants.TASKS_LIST_DELETE_SUCCESS: {
            const index = _tasks_list.findIndex(el => {
                return el.id === action.id
            });
            _tasks_list.splice(index, 1);
            TasksListStore.emitChange();
            break;
        }
        case AppConstants.TASKS_LIST_DELETE_FAIL: {
            _error = action.error;
            break;
        }
        default: {

        }
    }
});
export default TasksListStore;