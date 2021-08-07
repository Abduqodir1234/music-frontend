const get_one_artist = (data) => {
    return {
        type: "GET_ARTIST",
        payload: data
    }
}
export default get_one_artist