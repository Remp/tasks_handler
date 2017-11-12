import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppContants';
import api from '../api/index';

const TasksActions = {
    getTasks(tasksListId){
        api.getTasks(tasksListId)
        .then(data => {
            AppDispatcher.dispatch({
                type: AppConstants.TASK_REQUEST
            });
            AppDispatcher.dispatch({
                type: AppConstants.TASKS_LOAD_SUCCESS,
                tasks: data.items || []
            })
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type: AppConstants.TASKS_LOAD_FAIL,
                error: err
            })
        })
    },
    insertTask(task){
        api.insertTask(task)
        .then(data => {
            AppDispatcher.dispatch({
                type: AppConstants.TASK_INSERT_SUCCESS,
                task: data
            })
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type: AppConstants.TASK_INSERT_FAIL,
                error: err
            })
        })
    },
    updateTask(task, listId){
        api.updateTask(task, listId)
        .then(data => {
            AppDispatcher.dispatch({
                type: AppConstants.TASK_UPDATE_SUCCESS,
                task: data
            })
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type: AppConstants.TASK_UPDATE_FAIL,
                error: err
            })
        })
    },
    deleteTask(task, listId){
        api.deleteTask(task, listId)
        .then(data => {
            AppDispatcher.dispatch({
                type: AppConstants.TASK_DELETE_SUCCESS,
                id: task.id
            })
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type: AppConstants.TASK_DELETE_FAIL,
                error: err
            })
        })
    }
}
export default TasksActions;