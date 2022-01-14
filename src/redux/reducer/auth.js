const initState = {
    name: '',
    email: '',
    password: '',
    role_id: '',
    phone: ''
};


const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_REGISTER':
            return {
                ...state,
                name: action.value.name,
                email: action.value.email,
                password: action.value.password,
                role_id: action.value.role_id,
                phone: action.value.phone
            }
        case 'SET_LOGIN':
            return {
                ...state,
                email: action.value.email,
                password: action.value.password
            }
        default:
            return state;
    }
}

export default authReducer
