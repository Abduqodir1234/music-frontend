import { useDispatch } from "react-redux";
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
import Link from "next/link"
const Search = () => {
    const dispatch = useDispatch()
    const [value,setvalue] = useState("")
    const router = useRouter()
    const [item, setitem] = useState([])
    const [data,setdata] = useState([])
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
    const handleSearch = () => {
        axios({
            method:"GET",
            url:port + "/api/music/?search=" + value ,
        })
            .then(response=>{
                setitem(response.data.results)
                setdata(response.data)
            })
            .catch(error=>{
                console.log(error)
            })
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
                    {item !== []
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
                                <div className="container" style={{ width: "100%" }} >

                                    <div className="row">
                                        <div className="col-md-11 col-lg-10 col-12 col-sm-12">
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" placeholder="Search" onChange={(e) => setvalue(e.target.value)} />
                                                <div className="input-group-append">
                                                    <button className="btn btn-success" onClick={()=>handleSearch()} type="submit">Go</button>
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
                                                        <Marquee speed="30" gradient="0" pauseOnHover={true}>{category.title}</Marquee>
                                                    </div>
                                                    <div className="col-lg-1 col-md-2 col-sm-2 col-2">
                                                        <GetApp onClick={() => download(category.id)} style={{ cursor: "pointer" }} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {data !== []
                                            ?
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination justify-content-center">
                                                    <li className={data.previous ? "page-item" : "page-item disabled"}>
                                                        <Link  href={data.previous? data.previous : "#"} ><div tabIndex="-1" className="page-link">Previous</div></Link>
                                                    </li>
                                                    <li className="page-item"><Link  href="#"><div className="page-link"></div></Link></li>
                                                    <li className={data.next ? "page-item" : "page-item disabled"}>
                                                        <Link className="page-link" href={data.next  ? data.next : "#"}><div className="page-link">Next</div></Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                            :
                                            ""
                                        }
                                    </div>
                                </div>
                </div>
                <br />
                <br />
            </div>
        </div>
    )
}
export default Search;