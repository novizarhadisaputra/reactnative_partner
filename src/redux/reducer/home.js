
var moment = require('moment-timezone');

const initState = {
    now: moment().tz('Asia/Jakarta').format(),
    province: 'All',
    sex: 'All',
    time: ''
};

const homeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_DATE':
            return {
                ...state,
                now: action.value.now
            }
        case 'SET_TIME':
            return {
                ...state,
                time: action.value.time
            }
        case 'SET_REGION':
            return {
                ...state,
                region: action.value.region
            }
        case 'SET_PROVINCE':
            return {
                ...state,
                province: action.value.province
            }
        case 'SET_SEX':
            return {
                ...state,
                sex: action.value.sex
            }
        default:
            return state;
    }
}

export default homeReducer
