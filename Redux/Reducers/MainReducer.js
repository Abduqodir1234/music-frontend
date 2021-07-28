const initialstate = {
    category: [],
    artists: [],
    top_songs: []
}

export const mainreducer = (state = initialstate, action) => {
    switch (action.type) {
        case "GET_CATEGORY":
            return {
                ...state,
                category: action.payload
            }
        case "GET_ARTISTS":
            return {
                ...state,
                artists: action.payload
            }
        case "GET_TOP_SONGS":
            return {
                ...state,
                top_songs: action.payload
            }
        default: return state
    }
}