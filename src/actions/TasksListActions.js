import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppContants';
import api from '../api/index';

const TasksListActions = {
    getTasksList(){
        api.getTaskList()
        .then(data => {
            AppDispatcher.dispatch({
                type: AppConstants.TASKS_LIST_LOAD_SUCCESS,
                items: data.items
            })
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type: AppConstants.TASKS_LIST_LOAD_FAIL,
                error: err
            })
        })
    }
}
export default TasksListActions;