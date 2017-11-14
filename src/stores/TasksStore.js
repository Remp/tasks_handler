import AppConstants from '../constants/AppContants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const  CHANGE_EVENT = 'change';

let _tasks = [];
let _error = null;
let isLoading = false;
function deifyError(task){
    if (task.code)
        _error = task.code == '400' ? 'Failed task download' : 'Occured some problem'
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    getState(){
        return isLoading
    },
    getTasks(){
        return _tasks;
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
        case AppConstants.TASK_REQUEST: {
            isLoading = true;
            TasksStore.emitChange();
            break;
        }
        case AppConstants.TASKS_LOAD_SUCCESS: {
            _tasks = action.tasks;
            isLoading = false;
            deifyError(action.tasks);
            TasksStore.emitChange();
            break;
        }
        case AppConstants.TASKS_LOAD_FAIL: {
            _tasks = [];
            isLoading = false;
            _error = action.error;
            TasksStore.emitChange();
            break;
        }
        case AppConstants.TASK_INSERT_SUCCESS: {           
            _tasks.unshift(action.task);
            TasksStore.emitChange();
            break;
        }
        case AppConstants.TASK_INSERT_FAIL: {
            _error = action.error;
            TasksStore.emitChange(); 
            break;           
        }
        case AppConstants.TASK_UPDATE_REQUEST: {
            const index = _tasks.findIndex((task) => {
                return task.id === action.task.id
            });
            _tasks[index] = action.task; 
            TasksStore.emitChange();
            break;         
        }
        case AppConstants.TASK_UPDATE_SUCCESS: {
            const index = _tasks.findIndex((task) => {
                return task.id === action.task.id
            });
            _tasks[index] = action.task;
            TasksStore.emitChange();
            break;
        }
        case AppConstants.TASK_UPDATE_FAIL: {
            _error = action.error;
            TasksStore.emitChange();    
            break;        
        }
        case AppConstants.TASK_DELETE_SUCCESS: {
            const index = _tasks.findIndex((task) => {
                return action.id === task.id
            })
            _tasks.splice(index, 1);
            TasksStore.emitChange();  
            break;                      
        }
        case AppConstants.TASK_DELETE_FAIL: {
            _error = action.error;
            TasksStore.emitChange();
            break;
        }
        default: {}
    }
})
export default TasksStore;