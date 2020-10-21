import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user_reducer';

const reducer = combineReducers({
  userReducer,
});

export default createStore(reducer, applyMiddleware(thunk));
