const initState = {
    modalVisible: false
};

const partnerListReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_MODAL':
            return {
                ...state,
                modalVisible: action.value.modalVisible
            }
        default:
            return state;
    }
}

export default partnerListReducer
