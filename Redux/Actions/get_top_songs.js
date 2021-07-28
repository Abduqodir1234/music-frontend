const get_top_songs = (data) => {
    return {
        type: "GET_TOP_SONGS",
        payload: data
    }
}
export default get_top_songs