import { combineReducers } from "redux";
import authReducer from './auth';
import globalReducer from './global';
import homeReducer from './home';
import historyReducer from './history';
import orderReducer from './order';
import partnerListReducer from './partnerList';
import profileReducer from './profile';
import scheduleReducer from './schedule';

const reducer = combineReducers({
    authReducer,
    historyReducer,
    orderReducer,
    partnerListReducer,
    globalReducer,
    homeReducer,
    profileReducer,
    scheduleReducer
});

export default reducer;