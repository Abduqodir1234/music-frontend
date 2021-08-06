const get_recent_musics = (data) => {
    return {
        type: "GET_RECENT_MUSICS",
        payload: data
    }
}
export default get_recent_musics