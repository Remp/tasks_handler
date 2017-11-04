import AppConstants from '../constants/AppContants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

let _isLoggedIn = false;
const  CHANGE_EVENT = 'change';

// расширяем EventEmitter
const SessionStore = Object.assign({}, EventEmitter.prototype, {
    isLoggedIn(){
        return _isLoggedIn;
    },
    emitChange(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback){
        this.removeChangeListener(CHANGE_EVENT, callback);
    }
});
AppDispatcher.register(action => {
    switch(action.type){
        case AppConstants.SESSION_AUTHORIZE_SUCCESS: {
            _isLoggedIn = true;
            SessionStore.emitChange();
            break;
        }
        case AppConstants.SESSION_AUTHORIZE_FAIL: {
            _isLoggedIn = false;
            SessionStore.emitChange();
            break;
        }
        default: {

        }
    }
});
export default SessionStore;
