import axios from "axios";
import {port} from "../port";
import ArtistsNavigation from "../Components/ArtistsNavigation2";
import { useDispatch, useSelector } from "react-redux";
import get_all from "../Redux/Actions/get_all";
import { FavoriteBorder, GetApp } from "@material-ui/icons";
import { useEffect, useState } from "react";
import MusicContainer from "../Components/SubComponents/MusicContainer";
import get_one_artist from "../Redux/Actions/get_artist";
import AppsIcon from "@material-ui/icons/Apps"
const Artists = ({ all }) => {
    const dispatch = useDispatch()
    dispatch(get_all(all))
    const chosen2 = useSelector(state=>state.main.artist_id)
    const [full,setfull] = useState([])
    const [loading,setloading] = useState(true)
    const chosen3 = useSelector(state=>state.main.chosen_artist)
    const [chosen,setchosen] = useState(chosen3)
    useEffect(()=>{
        setchosen(chosen3)
    },[chosen3,chosen2])
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
            let array;
            array = typeof chosen !== "object" ? Object.assign({},all[0]) : Object.assign({},chosen)
            array.likes += 1
            setchosen(array)
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