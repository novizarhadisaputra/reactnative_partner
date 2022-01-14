const initState = {
    user: null,
    tmpUser: null,
    profile: null
};


const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.value.user,
            }
        case 'SET_TMP_USER':
            return {
                ...state,
                tmpUser: action.value.tmpUser,
            }
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.value.profile,
            }
        case 'REMOVE_USER': 
            return {
                ...state,
                profile: action.value.profile,
                tmpUser: action.value.tmpUser,
                user: action.value.user
            }
        default:
            return state;
    }
}

export default profileReducer
