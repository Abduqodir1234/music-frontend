
import React, { useRef, useState } from "react";
import picture from "../public/picture.png"
import Image from "next/image";
import { useWindowSize } from "./Navbar";
import {useDispatch, useSelector} from "react-redux";
import { port } from "../port";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import { GetApp } from "@material-ui/icons"
import picture2 from "../public/play.svg"
import AppsIcon from "@material-ui/icons/Apps";
import axios from "axios";
import get_one_music_info from "../Redux/Actions/get_one_music_info";
import get_music_id from "../Redux/Actions/get_music_id";
import open_player from "../Redux/Actions/openplayer";
import Marquee from "react-fast-marquee";
export default function DesktopMainCarousel() {
    const artists = useSelector(state => state.main.artists);
    const topmusics = useSelector(state => state.main.top_songs);
    const playlists = useSelector(state => state.main.category);
    const size = useWindowSize()
    const dispatch = useDispatch()
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
    return (
        <div style={{ width: "100%", height: "100%" }}>
              <div className="h-100" style={{ marginLeft: "40px", marginRight: "40px", backgroundColor: "#defaff", minHeight: "100%" }}><br /><br />
               {/* ---------------------------Top Music-------------------------------- */}
                <div style={{ backgroundColor: "#defaff" }}>
                    {topmusics !== ""
                        ?
                        <>
                            <h3 style={{}}>
                            <h4><MusicNoteIcon style={{color:"red", marginBottom: "3px", marginRight: "3px" }} />Top 10 Musics</h4><br />
                            </h3>
                        </>
                        :
                        ""
                    }
                    {
                        topmusics !== [] && topmusics.length !== 0 ?
                            (
                                <div className="container" style={{ width: "100%" }} >
                                    <div className="row">
                                        {topmusics.map(category =>
                                            <div
                                                className="col-md-5 col-lg-5 col-12"
                                                key={category.id}
                                                style=
                                                {{
                                                    backgroundColor: "white",
                                                    borderRadius: "15px",
                                                    paddingLeft: "15px",
                                                    marginBottom: "10px",
                                                    marginRight: "10px",
                                                    marginLeft: "10px",
                                                    paddingTop: "20px",
                                                    paddingBottom: "0px",
                                                    paddingRight: "15px"
                                                }}
                                                
                                            >
                                                <div className="row" onClick={() => musichandle(category.id)}>
                                                    <div 
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
                                                        className="col-lg-9 col-md-7 col-sm-9 col-9"
                                                        onClick={() => musichandle(category.id)} 
                                                        style={{textAlign:"justify", overflow: "hidden" }}>
                                                        <Marquee speed="30" gradient="0" pauseOnHover={true}>{category.artist}-{category.title}</Marquee>
                                                    </div>
                                                    <div className="col-lg-1 col-md-2 col-sm-1 col-1">
                                                        <GetApp onClick={() => download(category.id)} style={{ cursor: "pointer" }} />
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
                    </div>
                  <br/>
                  <br/>
                {/* --------------------Top Playlist-------------------------------------- */}
                <div style={{ backgroundColor: "#defaff" }}>
                    {playlists.category !== ""
                        ?
                        <>
                                <h4>
                                    <AppsIcon style={{color:"red", marginBottom: "3px", marginRight: "3px" }} />
                                    Top10 PlayList 
                                </h4><br />
                        </>
                        :
                        ""
                    }
                    {
                        playlists.category !== [] && playlists.category.length !== 0 ?
                            (
                                <div className="container" style={{ width: "100%" }} >
                                    <div className="row">
                                        {playlists.category.map(playlist =>
                                            <div
                                                className="col-md-3 col-lg-2 col-sm-3 col-xl-2"
                                                key={playlist.id}
                                                style=
                                                {{
                                                
                                                    borderRadius: "15px",
                                                    paddingLeft: "15px",
                                                    marginBottom: "10px",
                                                    marginRight: "10px",
                                                    marginLeft: "10px",
                                                    paddingTop: "20px",
                                                    paddingBottom: "0px",
                                                    paddingRight: "15px"
                                                }}
                                                
                                            >
                                               
                                                    <div 
                                                    className="col-lg-12 col-md-12 col-sm-12 col-xl-12"
                                                    style=
                                                        {{
                                                            overflow: "hidden",
                                                            height: "100%",
                                                            width: "100%" ,
                                                            marginBottom:"-10px"
                                                        }}
                                                    >
                                                        <Image
                                                         src={port +  playlist.photo}
                                                         width="100%"
                                                         height="100%"
                                                        />
                                                    </div>
                                                    <div 
                                                        className="col-lg-12 col-md-12 col-sm-12 col-xl-12 justify-content-sm-start"
                                                        style={{ textAlign: "justify", overflow: "hidden",}}>
                                                       <div style={{width:"100px"}}>
                                                           <Marquee speed="30" gradient="0" pauseOnHover={true}>
                                                               {playlist.title}
                                                               <div style={{width:"20px"}}></div>
                                                           </Marquee>
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
                    </div>
            </div>
            </div>
     
    );
}