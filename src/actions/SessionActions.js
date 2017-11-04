import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppContants';
import api from '../api';

const SessionActions = {
    authorize(immediate = false, callback){
        api.authorize({ immediate })
        .then(() => {
            AppDispatcher.dispatch({
                type: AppConstants.SESSION_AUTHORIZE_SUCCESS
            });
            if (callback)
                callback();
        })
        .catch((error) => {
            AppDispatcher.dispatch({
                type: AppConstants.SESSION_AUTHORIZE_FAIL
            });
            if (callback)
                callback;
        })
    }
}
export default SessionActions;