import AppConstants from '../constants/AppContants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const  CHANGE_EVENT = 'change';

let _tasks = [];
let _error = null;
function formatData(data){
    if (data)
    return {
        id          : data.id,
        text        : data.title,
        notes       : data.notes,
        dueTime     : data.due ? new Date(data.due) : '',
        isCompleted : data.status === 'completed',
        position    : data.position
    }
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    getTasks(){
        return _tasks;
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
        case AppConstants.TASKS_LOAD_SUCCESS: {
            _tasks = action.tasks.map(formatData);
            TasksStore.emitChange();
            break;
        }
        case AppConstants.TASKS_LOAD_FAIL: {
            _tasks = [];
            _error = action.error;
            TasksStore.emitChange();
            break;
        }
        case AppConstants.TASK_INSERT_SUCCESS: {
            
            _tasks.unshift(formatData(action.task));
            TasksStore.emitChange();
            break;
        }
        case AppConstants.TASK_INSERT_FAIL: {
            _error = action.error;
        }
    }
})
export default TasksStore;