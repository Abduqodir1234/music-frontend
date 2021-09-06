import Image from "next/image";
import picture2 from "../../public/play.svg"
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie"
import get_one_music_info from "../../Redux/Actions/get_one_music_info";
import get_music_id from "../../Redux/Actions/get_music_id";
import open_player from "../../Redux/Actions/openplayer";
import { useWindowSize } from "../Navbar";
import { GetApp, PlaylistAdd ,FavoriteBorder,Favorite} from "@material-ui/icons"
import { port } from "../../port";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

const MusicContainer = ({musicList = [],is_playlist=true}) =>{
    const [musics,setmusics] = useState(musicList)
    const [msg,setmsg] = useState("")
    useEffect(()=>{
        setmusics(musicList)
    },[musicList])
    const dispatch = useDispatch()
    const router = useRouter()
    const size = useWindowSize()
    let music_style;
    const handleLike = (index,id) => {
        axios.get(port + `/api/like/song/${id}`)
        .then(()=>{
            
            let array = [...musics];
            array[index].likes++;
            setmusics(array)
        })
        .catch(()=>{
            return;
        })
        
    }
    if(size.width > 1192){
        music_style = {
            marginLeft:"50px"
        }
    }
    else if(size.width > 1031 && size.width < 1192){
        music_style = {
            marginLeft:"30px"
        }
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
    const add_wishlist = (id) => {
        let playlist = Cookies.get("playlist")
        let wishlist
        if(typeof playlist !== "undefined"){
            wishlist = playlist
        }
        else{
            wishlist = ""
        }
        let new_wishlist
        if(wishlist === ""){
            new_wishlist =`${id},` 
        }
        else{
            let array = wishlist.split(",")
            let x = 0;
            array.map((value)=>{
                console.log(value,id)
                if(value === id.toString()){
                    return;
                }
                else{
                    x += 1
                }
            })
            if(x> array.length-1){
                if(array[1] === ""){
                    new_wishlist = wishlist + `${id}`
                }
                else{
                    new_wishlist = wishlist + `,${id}`
                }
            }
            else{
                new_wishlist = wishlist
            }
            
        }
        Cookies.remove("playlist")
        Cookies.set("playlist",new_wishlist,{expires:30})
        console.log(Cookies.get("playlist"))

    }
    const download = (id) => {
        axios.get(port + "/api/download/song/" + id)
            .then(response=>{
                router.push(response.data.url)
            })
    }
    let music_class;
    if(is_playlist){
        music_class = "col-lg-6 col-md-5 col-sm-7 col-6"
    }
    else{
        music_class = "col-lg-7 col-md-7 col-sm-8 col-7"
    }
    return (
        <>
        {
            musics !== [] && musics.length !== 0 ?
                (
                    <div className="col-md-12 col-12 col-lg-12 col-sm-12" style={{ width: "100%" }} >
                        <div className="row">
                            {musics.map((category,index) =>
                                <div
                                    className="col-md-5 col-sm-12 col-lg-5 col-12"
                                    key={category.id}
                                    style=
                                    {{
                                        backgroundColor: "white",
                                        borderRadius: "15px",
                                      
                                        marginBottom: "10px",
                                        marginRight: "10px",
                                        marginLeft: "10px",
                                        paddingTop: "20px",
                                        paddingBottom: "0px",
                                    
                                    }}

                                >
                                    <div className="row" >
                                        <div
                                            onClick={() => musichandle(category.id)}
                                            className="col-lg-1 col-md-2 col-sm-2 col-2"
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
                                            className={music_class}
                                            onClick={() => musichandle(category.id)}
                                            style={{ textAlign: "justify", overflow: "hidden"}}>
                                            <div 
                                                style=
                                                    {{
                                                        height:"27px",
                                                        overflow:"hidden",
                                                        textOverflow:"ellipsis",
                                                    }}
                                            >
                                                {category.title}
                                            </div>
                                        </div>
                                        <div 
                                            className="col-lg-1 col-md-1 col-sm-1 col-1" 
                                            style={music_style}
                                        >
                                            <FavoriteBorder
                                                onClick={() => handleLike(index,category.id)} 
                                                style={{ cursor: "pointer" }} 
                                            />
                                            <center>
                                                <label style={{textAlign:"center",fontSize:"small"}}>
                                                    {category.likes}
                                                </label>
                                            </center>
                                            
                                        </div>
                                        {is_playlist ? (
                                            <div 
                                            className="col-lg-1 col-md-1 col-sm-1 col-1" 
                                        >
                                            <PlaylistAdd 
                                                onClick={() => add_wishlist(category.id)} 
                                                style={{ cursor: "pointer" }} 
                                            />
                                        </div>
                                        ) : ""}
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                                            <GetApp 
                                                onClick={() => download(category.id)} 
                                                style={{ cursor: "pointer" }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
                :
                ""
        }
        </>
    )
}
export default MusicContainer