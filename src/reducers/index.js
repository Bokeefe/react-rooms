import {combineReducers}from 'redux';
import room from './room_reducer.js';

const rootReducer = combineReducers({
    room
});

export default rootReducer;