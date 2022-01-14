const initState = {
    statusName: 'allStatus'
};

const historyReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_STATUS':
            return {
                ...state,
                statusName: action.value.statusName
            }
        default:
            return state;
    }
}

export default historyReducer
