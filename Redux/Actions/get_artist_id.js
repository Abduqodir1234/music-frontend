const get_artist_id = (data) => {
    return {
        type: "GET_ARTIST_ID",
        payload: data
    }
}
export default get_artist_id;