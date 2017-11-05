import AppConstants from '../constants/AppContants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const  CHANGE_EVENT = 'change';

let _tasks_list = [];
let _error = null;

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
    emitChange(){
        this.emit(CHANGE_EVENT)
    },
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback)
    },
    removeChangeListener(callback){
        this.remove(CHANGE_EVENT, callback)
    }
});
AppDispatcher.register(action => {
    switch(action.type){
        case AppConstants.TASKS_LIST_LOAD_SUCCESS: {
            _tasks_list = action.items.map(formatData);
            TasksListStore.emitChange();
            break;
        }
        case AppConstants.TASKS_LIST_LOAD_FAIL: {
            _tasks_list = [];
            _error = action.error;
            TasksListStore.emitChange();
        }
        default: {

        }
    }
});
export default TasksListStore;