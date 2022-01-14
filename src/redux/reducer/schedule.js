
var moment = require('moment-timezone');

const initState = {
    start: moment().tz('Asia/Jakarta').format(),
    end: moment().tz('Asia/Jakarta').add(1, 'day').format(),
    'start-Sunday': [],
    'end-Sunday': [],
    'price-Sunday': [],
    'start-Monday': [],
    'end-Monday': [],
    'price-Monday': [],
    'start-Tuesday': [],
    'end-Tuesday': [],
    'price-Tuesday': [],
    'start-Wednesday': [],
    'end-Wednesday': [],
    'price-Wednesday': [],
    'start-Thursday': [],
    'end-Thursday': [],
    'price-Thursday': [],
    'start-Friday': [],
    'end-Friday': [],
    'price-Friday': [],
    'start-Saturday': [],
    'end-Saturday': [],
    'price-Saturday': [],
};

const scheduleReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_STARTDATE':
            return {
                ...state,
                start: action.value.start
            }
        case 'SET_ENDDATE':
            return {
                ...state,
                end: action.value.end
            }
        case 'SET_SUNDAY':
            return {
                ...state,
                'start-Sunday': action.value['start-Sunday'],
                'end-Sunday': action.value['end-Sunday'],
            }
        case 'SET_MONDAY':
            return {
                ...state,
                'start-Monday': action.value['start-Monday'],
                'end-Monday': action.value['end-Monday'],
            }

        case 'SET_TUESDAY':
            return {
                ...state,
                'start-Tuesday': action.value['start-Tuesday'],
                'end-Tuesday': action.value['end-Tuesday'],
            }
        case 'SET_WEDNESDAY':
            return {
                ...state,
                'start-Wednesday': action.value['start-Wednesday'],
                'end-Wednesday': action.value['end-Wednesday'],
            }
        case 'SET_THURSDAY':
            return {
                ...state,
                'start-Thursday': action.value['start-Thursday'],
                'end-Thursday': action.value['end-Thursday'],
            }
        case 'SET_FRIDAY':
            return {
                ...state,
                'start-Friday': action.value['start-Friday'],
                'end-Friday': action.value['end-Friday'],
            }
        case 'SET_SATURDAY':
            return {
                ...state,
                'start-Saturday': action.value['start-Saturday'],
                'end-Saturday': action.value['end-Saturday'],
            }
        default:
            return state;
    }
}

export default scheduleReducer
