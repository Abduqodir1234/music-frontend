import {artist_category_id} from "../../port";

const initialstate = {
    category: [],
    artists: [],
    top_songs: [],
    player_display: false,
    plays_music_id: undefined,
    playing_music_info: [],
    one_category_with_musics: [],
    chosen_category_title: "",
    recent_ones:[],
    all_songs:[],
    all:[],
    chosen_artist:undefined,
    artist_id:artist_category_id,
    category_id:artist_category_id
}

export const mainreducer = (state = initialstate, action) => {
    switch (action.type) {
        case "GET_ARTIST":
            return {
                ...state,
                chosen_artist: action.payload
            }
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
        case "chosen_category":
            return {
                ...state,
                chosen_category_title: action.payload
            }
        case "GET_RECENT_MUSICS":
            return {
                ...state,
                recent_ones: action.payload
            }
        case "GET_ALL_MUSICS":
            return {
                ...state,
                all_songs: action.payload
            }
        case "GET_ALL":
            return {
                ...state,
                all: action.payload
            }
        case "GET_ARTIST_ID":
            return  {
                ...state,
                artist_id: action.payload
            }
        case "GET_CATEGORY_ID":
            return  {
                ...state,
                category_id: action.payload
            }

        default: return state
    }
}