import { combineReducers } from 'redux';
import Master from './masterReducer';
export default combineReducers({
    
    Auth: Master,
});