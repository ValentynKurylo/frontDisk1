const initialState = {
    token: '',
    currentUser: {},
    isAuth: false,
    avatar: ""
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN': return {
            ...state,
            token: action.payload,
            isAuth: true
        }
        case 'LOGOUT': return {
            ...state,
            token: '',
            isAuth: false,
            currentUser: {}
        }
        case 'SET_CURRENT_USER': return {
            ...state,
            currentUser: action.payload
        }
        case "SET_AVATAR": return{
            ...state,
            avatar: action.payload
        }
        default:
            return state
    }
}