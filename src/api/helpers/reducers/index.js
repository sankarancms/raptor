import { combineReducers } from 'redux';
import userReducer from './userReducer';
import adminReducers from './adminReducer';


export default combineReducers({
    users: userReducer,
    configs: adminReducers
});
