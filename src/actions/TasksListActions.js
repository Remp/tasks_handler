import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppContants';
import api from '../api/index';

const TasksListActions = {
    getTasksList(callback){
        api.getTaskList()
        .then(data => {
            AppDispatcher.dispatch({
                type: AppConstants.TASKS_LIST_LOAD_SUCCESS,
                items: data.items
            });
            if (callback)
                callback();
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type: AppConstants.TASKS_LIST_LOAD_FAIL,
                error: err
            });
            if (callback)
                callback;
        })
    },
    insertTasksList(params){
        api.insertTasksList(params)
        .then(data => {
            AppDispatcher.dispatch({
                type: AppConstants.TASKS_LIST_INSERT_SUCCESS,
                taskList: data
            })
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type: AppConstants.TASKS_LIST_INSERT_FAIL,
                error: err
            })
        })
    }
}
export default TasksListActions;