import axios from "axios";
import {artist_category_id, port} from "../port";
import ArtistsNavigation from "../Components/ArtistsNavigation2";
import { useDispatch, useSelector } from "react-redux";
import get_all from "../Redux/Actions/get_all";
import AppsIcon from "@material-ui/icons/Apps";
import Image from "next/image";
import picture2 from "../public/play.svg";
import Marquee from "react-fast-marquee";
import { GetApp } from "@material-ui/icons";
import { useEffect, useState } from "react";
import get_one_music_info from "../Redux/Actions/get_one_music_info";
import get_music_id from "../Redux/Actions/get_music_id";
import open_player from "../Redux/Actions/openplayer";
import { useRouter } from "next/dist/client/router";
import {useWindowSize} from "../Components/Navbar";
import Link from "next/link"
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
            .catch(eror=>{
                console.log(eror)
            })
    }
    const musichandle = (id) => {
        axios.get(port + "/api/songs/" + id)
            .then(response => {
                dispatch(get_one_music_info(response.data))
            })
            .catch(error => {
                console.log(error)
            })
        dispatch(get_music_id(id))
        dispatch(open_player())
    }
    const router = useRouter()
    const download = (id) => {
        axios.get(port + "/api/download/song/" + id)
            .then(response=>{
                router.push(response.data.url)
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
               <div className="col-lg-11 col-xl-11 col-md-10 col-sm-10 col-10">

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
                                       {chosen === undefined ? all[0].name : chosen}
                                   </h3><br />
                               </>

                               {
                                   data !== [] && data.length !== 0 ?
                                       (
                                           <div className="container" style={{ width: "100%" }} >
                                               <div className="row">
                                                   {data.map(category =>
                                                       <div
                                                           className="col-md-5 col-lg-5 col-sm-11 col-12"
                                                           key={category.id}
                                                           style=
                                                               {{
                                                                   backgroundColor: "white",
                                                                   borderRadius: "15px",
                                                                   paddingLeft: "15px",
                                                                   marginBottom: "10px",
                                                                   marginRight: "20px",
                                                                   marginLeft: "20px",
                                                                   paddingTop: "20px",
                                                                   paddingBottom: "0px",
                                                                   paddingRight: "15px"
                                                               }}

                                                       >
                                                           <div className="row" >
                                                               <div
                                                                   onClick={() => musichandle(category.id)}
                                                                   className="col-lg-1 col-md-1 col-sm-2 col-2"
                                                                   style=
                                                                       {{
                                                                           borderRadius: "15px",
                                                                           overflow: "hidden",
                                                                           height: "50px",
                                                                           width: "50px"
                                                                       }}
                                                               >
                                                                   <Image
                                                                       src={picture2}
                                                                       width={200}
                                                                       height={200}
                                                                   />
                                                               </div>
                                                               <div
                                                                   className="col-lg-9 col-md-8 col-sm-8 col-7"
                                                                   onClick={() => musichandle(category.id)}
                                                                   style={{ textAlign: "center", overflow: "hidden" }}>
                                                                   <Marquee speed={30} gradient='none'>
                                                                       {category.title}
                                                                       <div style={{ width: '20px' }}>

                                                                       </div>
                                                                   </Marquee>
                                                               </div>
                                                               <div className="col-lg-1 col-md-1 col-2 col-sm-2">
                                                                   <GetApp
                                                                       className="float-end"
                                                                       onClick={() => download(category.id)}
                                                                       style={{ cursor: "pointer" }}
                                                                   />
                                                               </div>
                                                           </div>
                                                       </div>
                                                   )}
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
                                               </div>
                                           </div>
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