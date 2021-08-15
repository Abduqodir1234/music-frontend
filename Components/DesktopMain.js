
import React, { useRef, useState } from "react";
import picture from "../public/picture.png"
import Image from "next/image";
import { useWindowSize } from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
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
import PersonIcon from "@material-ui/icons/Person";
import { useRouter } from "next/dist/client/router";
import picture3 from "../public/noimage.jpg";
import chosen_category from "../Redux/Actions/chosen_catgory";
import get_category_with_music from "../Redux/Actions/get_category_with_songs";
import get_category_id from "../Redux/Actions/get_category_id";
import get_artist_id from "../Redux/Actions/get_artist_id";
import get_artist from "../Redux/Actions/get_artist";
export default function DesktopMainCarousel() {
    const artists = useSelector(state => state.main.artists);
    const topmusics = useSelector(state => state.main.top_songs);
    const playlists = useSelector(state => state.main.category);
    const recents = useSelector(state => state.main.recent_ones)
    const dispatch = useDispatch()
    const router = useRouter()
    const download = (id) => {
        axios.get(port + "/api/download/song/" + id)
            .then(response=>{
                router.push(response.data.url)
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
    const handleclick2 = (id, title) => {
        dispatch(get_artist_id(id))
        dispatch(get_artist(title))
        router.push("/artists")
    }
    const handleclick = (id, title) => {
        dispatch(chosen_category(title))
        dispatch(get_category_id(id))
        router.push("/category")
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
                                <h4><MusicNoteIcon style={{ color: "red", marginBottom: "3px", marginRight: "3px" }} />Top 10 Musics</h4>
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
                                                        className="col-lg-9 col-md-7 col-sm-9 col-9"
                                                        onClick={() => musichandle(category.id)}
                                                        style={{ textAlign: "justify", overflow: "hidden" }}>
                                                        <Marquee speed="30" gradient="0" pauseOnHover={true}>{category.title}</Marquee>
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
                <br />
                <br />
                {/*--------------------Recent Ones-------------------------*/}
                <div style={{ backgroundColor: "#defaff" }}>
                    {recents !== ""
                        ?
                        <>
                            <h3 style={{}}>
                                <h4><MusicNoteIcon style={{ color: "red", marginBottom: "3px", marginRight: "3px" }} />Top 10 Recents</h4>
                            </h3>
                        </>
                        :
                        ""
                    }
                    {
                        recents !== [] && recents.length !== 0 ?
                            (
                                <div className="container" style={{ width: "100%" }} >
                                    <div className="row">
                                        {recents.map(category =>
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
                                                        className="col-lg-9 col-md-7 col-sm-9 col-9"
                                                        onClick={() => musichandle(category.id)}
                                                        style={{ textAlign: "justify", overflow: "hidden" }}>
                                                        <Marquee speed="30" gradient="0" pauseOnHover={true}>{category.title}</Marquee>
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
                <br />
                <br />
                {/* --------------------Top Playlist-------------------------------------- */}
                <div style={{ backgroundColor: "#defaff" }}>
                    {playlists.category !== ""
                        ?
                        <>
                            <h4>
                                <AppsIcon style={{ color: "red", marginBottom: "3px", marginRight: "3px" }} />
                                Top10 PlayList
                            </h4>
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
                                                    onClick={()=>handleclick(playlist.id,playlist.title)}
                                                    className="col-lg-12 col-md-12 col-sm-12 col-xl-12"
                                                    style=
                                                    {{
                                                        overflow: "hidden",
                                                        height: "100%",
                                                        width: "100%",
                                                        marginBottom: "-10px"
                                                    }}
                                                >
                                                    <Image
                                                        src={playlist.image_url ?playlist.image_url :picture3}
                                                        width="100%"
                                                        height="100%"
                                                    />
                                                </div>
                                                <div
                                                    onClick={()=>handleclick(playlist.id,playlist.title)}
                                                    className="col-lg-12 col-md-12 col-sm-12 col-xl-12 justify-content-sm-start"
                                                    style={{ textAlign: "justify", overflow: "hidden", }}>
                                                    <div style={{ width: "100px" }}>
                                                        <Marquee speed="30" gradient="0" pauseOnHover={true}>
                                                            {playlist.title}
                                                            <div style={{ width: "20px" }}></div>
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
                </div><br /><br />
                {/*----------------------Top Artists----------------------*/}
                <div style={{ backgroundColor: "#defaff" }}>
                    {artists !== ""
                        ?
                        <>
                            <h4>
                                <PersonIcon style={{ color: "red", marginBottom: "3px", marginRight: "3px" }} />
                                Top Artists
                            </h4>
                        </>
                        :
                        ""
                    }
                    {
                        artists !== [] && artists.length !== 0 ?
                            (
                                <div className="container" style={{ width: "100%" }} >
                                    <div className="row">
                                        {artists.map(playlist =>
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
                                                    onClick={()=>handleclick2(playlist.id,playlist.name)}
                                                    className="col-lg-12 col-md-12 col-sm-12 col-xl-12"
                                                    style=
                                                    {{
                                                        overflow: "hidden",
                                                        height: "100%",
                                                        width: "100%",
                                                        marginBottom: "-10px"
                                                    }}
                                                >
                                                    <Image
                                                        src={playlist.photo2 ?playlist.photo2 :picture3}
                                                        width="100%"
                                                        height="100%"
                                                    />
                                                </div>
                                                <div
                                                    className="col-lg-12 col-md-12 col-sm-12 col-xl-12 justify-content-sm-start"
                                                    style={{ textAlign: "justify", overflow: "hidden", }}>
                                                    <div style={{ width: "100px" }}>
                                                        <Marquee speed="30" gradient="0" pauseOnHover={true}>
                                                            {playlist.name}
                                                            <div style={{ width: "20px" }}></div>
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