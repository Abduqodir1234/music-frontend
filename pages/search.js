import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import picture2 from "../public/play.svg";
import Marquee from "react-fast-marquee";
import { GetApp } from "@material-ui/icons";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/dist/client/router";
import { port } from "../port";
import axios from "axios";
import get_one_music_info from "../Redux/Actions/get_one_music_info";
import get_music_id from "../Redux/Actions/get_music_id";
import open_player from "../Redux/Actions/openplayer";
const Search = () => {
    const data = useSelector(state => state.main.all_songs)
    const dispatch = useDispatch()
    const router = useRouter()
    const [item, setitem] = useState(data)
    const download = (id) => {
        let url = port + "/api/download/song/" + id
        router.push(url, null, { shallow: true })
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
    const handleSearch = (e) => {
        const t = data.filter(music => {
            let x = music.title;

            return  music.title.toLowerCase().includes(e.target.value.toLowerCase()) || x.toLowerCase().includes(e.target.value.toLowerCase()) ? music : ""
        });
        setitem(t);
    }
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div
                className="h-100"
                style=
                {{
                    marginLeft: "40px",
                    marginRight: "40px",
                    backgroundColor: "#defaff",
                    minHeight: "100%"
                }}
            >
                <br />
                <br />
                {/* ---------------------------Top Music-------------------------------- */}
                <div
                    style=
                    {{
                        backgroundColor: "#defaff"
                    }}
                >
                    {data !== ""
                        ?
                        <>
                            <h3>
                                <h4>
                                    <SearchIcon
                                        style=
                                        {{
                                            color: "red",
                                            marginBottom: "3px",
                                            marginRight: "3px"
                                        }}
                                    />
                                    Search
                                </h4>
                            </h3>
                        </>
                        :
                        ""
                    }
                    {
                        data !== [] && data.length !== 0 ?
                            (
                                <div className="container" style={{ width: "100%" }} >

                                    <div className="row">
                                        <div className="col-md-11 col-lg-10 col-12 col-sm-12">
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" placeholder="Search" onChange={(e) => handleSearch(e)} />
                                                <div className="input-group-append">
                                                    <button className="btn btn-success" type="submit">Go</button>
                                                </div>
                                            </div>
                                        </div>
                                        {item.map(category =>
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
                                                        className="col-lg-9 col-md-7 col-sm-8 col-8"
                                                        onClick={() => musichandle(category.id)}
                                                        style={{ textAlign: "justify", overflow: "hidden" }}>
                                                        <Marquee speed="30" gradient="0" pauseOnHover={true}>{category.artist}-{category.title}</Marquee>
                                                    </div>
                                                    <div className="col-lg-1 col-md-2 col-sm-2 col-2">
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
            </div>
        </div>
    )
}
export default Search;