const initialstate = {
    category: [],
    artists: [],
    top_songs: [],
    player_display: false,
    plays_music_id: undefined,
    playing_music_info: [],
    one_category_with_musics: []
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
        case "OPEN_PLAYER":
            return {
                ...state,
                player_display: true
            }
        case "CLOSE_PLAYER":
            return {
                ...state,
                player_display: false
            }
        case "GET_MUSIC_ID":
            return {
                ...state,
                plays_music_id: action.payload
            }
        case "GET_ONE_MUSIC_INFO":
            return {
                ...state,
                playing_music_info: action.payload
            }
        case "GET_CATEGORY_WITH_MUSIC":
            return {
                ...state,
                one_category_with_musics: action.payload
            }
        default: return state
    }
}