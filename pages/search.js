import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import SearchIcon from "@material-ui/icons/Search";
import { port } from "../port";
import axios from "axios";
import MusicContainer from "../Components/SubComponents/MusicContainer";
const Search = () => {
    const [item, setitem] = useState([])
    const [data,setdata] = useState([])
    const handlepagination = (url) =>{
        axios.get(url)
            .then(response=>{
                setitem(response.data.results)
                setdata(response.data)
            })
            .catch(eror=>{
                console.log(eror)
            })
    }
    const handleSearch = (e) => {
        axios({
            method:"GET",
            url:port + "/api/music/?search=" + e.target.value ,
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
        <div style={{ width: "100%", height: "100%",marginBottom:"100px" }}>
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
                                                <input type="text" className="form-control" placeholder="Search" onChange={(e) =>handleSearch(e)} />
                                                <div className="input-group-append">
                                                    <button className="btn btn-success" onClick={()=>handleSearch()} type="submit">Go</button>
                                                </div>
                                            </div>
                                        </div>
                                        <MusicContainer musicList={item} />
                                        {data.length !== 0?
                                            <nav className="col-md-10" aria-label="Page navigation example">
                                                <ul className="pagination justify-content-center">
                                                    <li className={ data.links.previous ? "page-item" : "page-item disabled"} style={{cursor:"pointer"}}>
                                                        <div onClick={()=>handlepagination(data.links.previous ? data.links.previous : "#")} className="page-link" >Prev</div>
                                                    </li>
                                                    <li className="page-item"><div className="page-link">{data.current_page_number}</div></li>
                                                    <li  className={data.links.next ? "page-item " : "page-item disabled"} style={{cursor:"pointer"}}>
                                                        <div onClick={()=>handlepagination(data.links.next ? data.links.next : "#")} className="page-link" >Next</div>
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