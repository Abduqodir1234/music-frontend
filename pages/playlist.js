import MusicContainer from "../Components/SubComponents/MusicContainer"
import cookies from "next-cookies"
import axios from "axios"
import { port } from "../port"
import { PlaylistPlay }  from "@material-ui/icons"
import { useState } from "react"
import Cookies from  "js-cookie"
const Playlist = ({playlist}) =>{
    const [data,setdata] = useState(playlist)
    const handlepagination = (url) =>{
        const playlist = Cookies.get("playlist")
        let playlist2
        if(typeof playlist === "undefined"){
            playlist2 = []
        }
        else{
            playlist2 = playlist
        }
        axios({
            method:"POST",
            url:url,
            data:{"array":playlist2}
        })
            .then(response=>{
                setdata(response.data)
            })
            .catch(()=>{
                return;
            })
    }
    return (
        <div style={{marginBottom:"100px",marginTop:"60px",marginLeft: "40px", marginRight: "40px", }}>
            <h3>
                <PlaylistPlay style={{ color: "red", marginBottom: "3px" }} /> 
                   Playlist                  
          </h3> <br/>
            {data !== [] && data.length !== 0 ?
               (
                   <>
                        <MusicContainer musicList={data.results} is_playlist={false} />
                                {data?.links?.length !== 0?
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-center">
                                            <li className={ data?.links?.previous ? "page-item" : "page-item disabled"} style={{cursor:"pointer"}}>
                                                <div onClick={()=>handlepagination(data?.links?.previous)} className="page-link" >Previous</div>
                                            </li>
                                            <li className="page-item"><div className="page-link">{data?.current_page_number}</div></li>
                                            <li  className={data?.links?.next ? "page-item" : "page-item disabled"} style={{cursor:"pointer"}}>
                                                <div onClick={()=>handlepagination(data?.links?.next)} className="page-link" >Next</div>
                                            </li>
                                        </ul>
                                    </nav>
                                    :
                                    ""
                                }
                    </>
               )
                   :
                   <h6>There is no musics related </h6>
           }
        </div>
    )
}


Playlist.getInitialProps = async(ctx) =>{
    const {playlist} = cookies(ctx)
    let playlist2
    if(typeof playlist === "undefined"){
        playlist2 = []
    }
    else{
        playlist2 = playlist
    }
    const a = await axios({
        method:"POST",
        url:`${port}/api/playlist/musics/`,
        data:{"array":playlist2}
    })
    const answer = a.data
    return {
        "playlist":answer
    }
    
}
export default Playlist;