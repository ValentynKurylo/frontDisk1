const initialState = {
    files: [],
    currentDir: '',
    createModal: 'none',
    dirStack: []
}

export const FileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILES': return {
            ...state,
            files: action.payload
        }
        case 'ADD_FILES': return {
            ...state,
            files: [...state.files, action.payload]
        }
        case 'DELETE_FILE': return {
            ...state,
            files: [...state.files.filter(file => file._id != action.payload)]
        }
        case 'SET_CURRENT_DIR': return {
            ...state,
            currentDir: action.payload
        }
        case 'SET_CREATE_MODAL': return {
            ...state,
            createModal: action.payload
        }
        case 'SET_STACK_DIR': return {
            ...state,
            dirStack: action.payload
        }
        case 'ADD_FILE': return {
            ...state,
            files: [...state.files, action.payload]
        }
        default:
            return state
    }
}