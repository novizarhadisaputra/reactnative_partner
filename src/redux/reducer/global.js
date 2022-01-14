const initState = {
    isLoading: false,
    isError: false,
    message: '',
    language: 'en',
    hasLogin: false,
    hasSubmit: false,
    hasNotification: false,
    isActiveNotification: false,
    showModal: false,
    mounted: false
};

const globalReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_ERROR':
            return {
                ...state,
                isError: action.value.isError,
                message: action.value.message
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.value.isLoading
            }
        case 'SET_SUCCESS':
            return {
                ...state,
                isError: action.value.isError,
                message: action.value.message
            }
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: action.value.language
            }
        case 'SET_HAS_LOGIN':
            return {
                ...state,
                hasLogin: action.value.hasLogin
            }
        case 'SET_HAS_SUBMIT':
            return {
                ...state,
                hasSubmit: action.value.hasSubmit
            }
        case 'SET_MOUNTED':
            return {
                ...state,
                mounted: action.value.mounted
            }
        case 'SHOW_MODAL':
            return {
                ...state,
                showModal: action.value.showModal
            }
        case 'TOGGLE_NOTIFICATION':
            return {
                ...state,
                isActiveNotification: action.value.isActiveNotification
            }
        default:
            return state;
    }
}

export default globalReducer
