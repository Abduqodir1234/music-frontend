import axios from "axios";
import {artist_category_id, port} from "../port";
import ArtistsNavigation from "../Components/ArtistsNavigation2";
import { useDispatch, useSelector } from "react-redux";
import get_all from "../Redux/Actions/get_all";
import AppsIcon from "@material-ui/icons/Apps";
import Image from "next/image";
import picture2 from "../public/play.svg";
import Marquee from "react-fast-marquee";
import { FavoriteBorder, GetApp } from "@material-ui/icons";
import { useEffect, useState } from "react";
import get_one_music_info from "../Redux/Actions/get_one_music_info";
import get_music_id from "../Redux/Actions/get_music_id";
import open_player from "../Redux/Actions/openplayer";
import { useRouter } from "next/dist/client/router";
import {useWindowSize} from "../Components/Navbar";
import Link from "next/link"
import MusicContainer from "../Components/SubComponents/MusicContainer";
import get_one_artist from "../Redux/Actions/get_artist";
const Artists = ({ all }) => {
    const dispatch = useDispatch()
    dispatch(get_all(all))
    const chosen2 = useSelector(state=>state.main.artist_id)
    const [full,setfull] = useState([])
    const [loading,setloading] = useState(true)
    const chosen = useSelector(state=>state.main.chosen_artist)
    const [data, setdata] = useState([])
    const handlepagination = (url) =>{
        axios.get(url)
            .then(response=>{
                setdata(response.data.results)
                setfull(response.data)
            })
            .catch(()=>{
                return;
            })
    }
    const handleLike = (id) =>{
        axios.post(`${port}/api/artist/like/${id}`)
        .then(()=>{
            let real = chosen?.length !== 0 ? chosen : all[0]
            let array = []
            if(typeof chosen === "undefined"){
              array = all[0]
            }
            else{
               array = chosen
            }
            array.likes += 1
            dispatch(get_one_artist(array))
        })
        .catch((e)=>{
            console.log("eeeeeeeeee",e)
            return;
        })
    }
    useEffect(() => {
        setloading(true)
        axios.get(port + "/api/songs/artist/" + chosen2)
            .then(response=>{
                setdata(response.data.results)
                setfull(response.data)
                setloading(false)
            })
            .catch(eror=>{
                console.log(eror)
            })
    }, [chosen2])
    return (
       <div className="col-md-12">
           <div className="row">
               <div className="col-lg-1 col-xl-1 col-md-2 col-sm-2 col-2">
                   <ArtistsNavigation />
               </div>
               
               <div 
               className="col-lg-10 col-xl-10 col-md-9 col-sm-9 col-9" style={{marginLeft:"20px"}}>

                       <div
                           className="h-100"
                           style=
                               {{
                                   marginLeft: "10px",
                                   marginRight: "40px",
                                   marginBottom: "150px",
                                   backgroundColor: "#defaff",
                                   minHeight: "100%"
                               }}
                       ><br /><br />
                           <div style={{ backgroundColor: "#defaff" }}>

                               <>
                                   <h3 style={{}}>
                                       <AppsIcon
                                           style=
                                               {{
                                                   color: "red",
                                                   marginBottom: "3px"
                                               }}
                                       />
                                       {chosen === undefined ? all[0].name : chosen.name}
                                       <label onClick={()=>handleLike(chosen?.id ? chosen?.id : all[0].id)} style={{cursor:"pointer"}}>
                                            <FavoriteBorder style={{marginLeft:"10px",color:"red"}} />
                                            <label  style={{fontSize:"small"}}>{chosen === undefined ? all[0].likes : chosen.likes}</label>
                                        </label>
                                   </h3><br />
                               </>

                               {
                                   data !== [] && data.length !== 0 ?
                                       (
                                           <>
                                                <MusicContainer musicList={data} />
                                                        {loading === false && full.length !== 0?
                                                            <nav aria-label="Page navigation example">
                                                                <ul className="pagination justify-content-center">
                                                                    <li className={ full.links.previous ? "page-item" : "page-item disabled"} style={{cursor:"pointer"}}>
                                                                        <div onClick={()=>handlepagination(full.links.previous)} className="page-link" >Previous</div>
                                                                    </li>
                                                                    <li className="page-item"><div className="page-link">{full.current_page_number}</div></li>
                                                                    <li  className={full.links.next ? "page-item" : "page-item disabled"} style={{cursor:"pointer"}}>
                                                                        <div onClick={()=>handlepagination(full.links.next)} className="page-link" >Next</div>
                                                                    </li>
                                                                </ul>
                                                            </nav>
                                                            :
                                                            ""
                                                        }
                                            </>
                                       )
                                       :
                                       <h6>There is no musics related to chosen category</h6>
                               }
                           </div>
                       </div >
               </div>
           </div>
       </div>
    )
}
Artists.getInitialProps = async () => {
    const request = await axios({
        method: "GET",
        url: port + "/api/artists"
    })
    const answer = await request.data
    return {
        all: answer
    }
}
export default Artists