const initialState = {
    loader: false
}

export const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOADER": return {
            ...state,
            loader: action.payload
        }
        default:
            return state
    }
}