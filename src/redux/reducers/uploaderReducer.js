const initialState = {
    isVisible: false,
    filesUpload: []
}

export const UploaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_IS_VISIBLE': return {
            ...state,
            isVisible: action.payload
        }
        case 'SET_UPLOAD_FILES': return {
            ...state,
            filesUpload: action.payload
        }
        case 'ADD_UPLOAD_FILE':
            return {...state,
                filesUpload: [...state.filesUpload, action.payload]}
        case 'REMOVE_UPLOAD_FILE':
            return {...state,
                filesUpload: [...state.filesUpload.filter(file => file.id != action.payload)]}
        case 'CHANGE_UPLOAD_FILE':
            return {
                ...state,
                filesUpload: [...state.filesUpload.map(file => file.id == action.payload.id
                    ? {...file, progress: action.payload.progress}
                    : {...file}
                )]
            }
        default:
            return state
    }
}