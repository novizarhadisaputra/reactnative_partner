const initState = {
    total_price: 0,
    total_paid: 0,
    payment_method_id: 3,
    notes: '',
    voucher_id: '',
    transaction_status_id: 1,
    details: null
};

const orderReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_DETAILS_ORDER':
            return {
                ...state,
                details: action.value.details
            }
        case 'SET_NOTES_ORDER':
            return {
                ...state,
                notes: action.value.notes
            }
        case 'SET_PAYMENT_MEETHOD_ORDER':
            return {
                ...state,
                payment_method_id: action.value.payment_method_id
            }
        case 'SUBMIT_ORDER':
            return {
                ...state,
                notes: action.value.details
            }
        default:
            return state;
    }
}

export default orderReducer
