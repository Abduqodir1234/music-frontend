import axios from "axios";
import {port} from "../port";
import ArtistsNavigation from "../Components/ArtistsNavigation2";
import {useDispatch, useSelector} from "react-redux";
import get_all from "../Redux/Actions/get_all";
import AppsIcon from "@material-ui/icons/Apps";
import Image from "next/image";
import picture2 from "../public/play.svg";
import Marquee from "react-fast-marquee";
import {GetApp} from "@material-ui/icons";
import {useEffect, useState} from "react";

const Artists =({all})=>{
    const dispatch = useDispatch()
    dispatch(get_all(all))
    const chosen = useSelector(state=>state.main.chosen_artist)
    const [data,setdata] = useState([])
    const all_songs  = useSelector(state=>state.main.all_songs)
    useEffect(()=>{
        let art = chosen === undefined ? all[0].name: chosen
        const filtered = all_songs.filter(music=>music.artist.toLowerCase() === art.toLowerCase() ? music : "")
        setdata(filtered)
        console.log("Song",all_songs)
        console.log("Filtered",filtered)
    },[chosen])
    return (
        <ArtistsNavigation>
            <div className="h-100" style={{ marginLeft: "40px", marginRight: "40px", marginBottom: "150px", backgroundColor: "#defaff", minHeight: "100%" }}><br /><br />
                <div style={{ backgroundColor: "#defaff" }}>

                        <>
                            <h3 style={{}}>
                                <AppsIcon style={{color:"red", marginBottom: "3px" }} /> {chosen === undefined ? all[0].name : chosen}
                            </h3><br />
                        </>

                    {
                        data !== [] && data.length !== 0 ?
                            (
                                <div className="container" style={{ width: "100%" }} >
                                    <div className="row">
                                        {data.map(category =>
                                            <div
                                                className="col-md-5 col-lg-5 col-12"
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
                                                <div className="row" onClick={() => musichandle(category.id)}>
                                                    <div
                                                        className="col-lg-1 col-md-1 col-2"
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
                                                        className="col-lg-9 col-md-10 col-8"
                                                        onClick={() => musichandle(category.id)}
                                                        style={{ textAlign: "center", overflow: "hidden" }}>
                                                        <Marquee speed={30} gradient='none'> {category.artist}-{category.title} <div style={{width:'20px'}}></div></Marquee>
                                                    </div>
                                                    <div className="col-lg-1 col-md-1 col-1">
                                                        <GetApp onClick={() => download(category.id)} style={{ cursor: "pointer" }} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                            :
                            <h6>There is no musics related to chosen category</h6>
                    }
                </div>
            </div >
        </ArtistsNavigation>
    )
}
Artists.getInitialProps = async () =>{
    const request = await axios({
        method:"GET",
        url:port + "/api/artists"
    })
    const answer = await request.data
    return {
        all: answer
    }
}
export default Artists