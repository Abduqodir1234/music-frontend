const get_artists = (data) => {
    return {
        type: "GET_ARTISTS",
        payload: data
    }
}
export default get_artists