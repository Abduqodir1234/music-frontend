import {port} from "../../port";
import axios from "axios";
import get_all_musics from "../Actions/get_all_musics";

export const fetch_all_musics = ()=>{
    return function (dispatch) {
         axios({
            method:"GET",
            url:port + "/api/music",
        })
            .then(response =>{
                dispatch(get_all_musics(response.data))
            })
            .catch(errors2=>{
                console.log(errors2)
            })
    }
}