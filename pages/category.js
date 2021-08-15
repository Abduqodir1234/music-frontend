import Image from "next/image"
import AppsIcon from "@material-ui/icons/Apps"
import axios from "axios"
import { port } from "../port"
import "bootstrap/dist/css/bootstrap.min.css"
import CategoryNavigation from "../Components/CategoryNavigation"
import { useSelector, useDispatch } from "react-redux"
import get_music_id from "../Redux/Actions/get_music_id"
import open_player from "../Redux/Actions/openplayer"
import { GetApp } from "@material-ui/icons"
import { useRouter } from "next/dist/client/router"
import get_one_music_info from "../Redux/Actions/get_one_music_info"
import chosen_category from "../Redux/Actions/chosen_catgory"
import picture2 from "../public/play.svg"
import { useEffect } from "react"
import Marquee from "react-fast-marquee";
import get_category_with_music from "../Redux/Actions/get_category_with_songs";
const CategoryList = ({ data }) => {
    const music = useSelector(state => state.main.one_category_with_musics)
    const category = useSelector(state => state.main.chosen_category_title)
    const dispatch = useDispatch()
    dispatch(get_one_music_info(data.music))
    const handlepagination = (url) =>{
        axios.get(url)
            .then(response=>{
                dispatch(get_category_with_music(response.data))
                dispatch(chosen_category(response.data.results[0].category.title))
            })
            .catch(eror=>{
                console.log(eror)
            })
    }
    useEffect(() => {
        dispatch(chosen_category(data.category_name))
    }, [])
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
    return (
        <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="row">
                <div className="col-lg-1 col-xl-1 col-md-1 col-sm-1 col-2" >
                    <CategoryNavigation data={data} className="fixed-left h-100" />
                </div>
                <div className="col-lg-11 col-xl-11 col-md-11 col-sm-1 col-10">

                        <div className="h-100" style={{ marginLeft: "40px", marginRight: "40px", marginBottom: "150px", backgroundColor: "#defaff", minHeight: "100%" }}><br /><br />
                            <div style={{ backgroundColor: "#defaff" }}>
                                {category !== ""
                                    ?
                                    <>
                                        <h3 style={{}}>
                                            <AppsIcon style={{ color: "red", marginBottom: "3px" }} /> {category}
                                        </h3><br />
                                    </>
                                    :
                                    ""
                                }
                                {
                                    music !== [] && music.length !== 0 ?
                                        (
                                            <div className="container" style={{ width: "100%" }} >
                                                <div className="row">
                                                    {music.results.map(category =>
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
                                                                    className="col-lg-9 col-md-10 col-sm-9 col-7"
                                                                    onClick={() => musichandle(category.id)}
                                                                    style={{ textAlign: "center", overflow: "hidden" }}>
                                                                    <Marquee speed={30} gradient='none'> {category.title} <div style={{ width: '20px' }}></div></Marquee>
                                                                </div>
                                                                <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                                                                    <GetApp onClick={() => download(category.id)} style={{ cursor: "pointer" }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {music.length !== 0?
                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination justify-content-center">
                                                                <li className={ music.links.previous ? "page-item" : "page-item disabled"} style={{cursor:"pointer"}}>
                                                                    <div onClick={()=>handlepagination(music.links.previous)} className="page-link" >Previous</div>
                                                                </li>
                                                                <li className="page-item"><div className="page-link">{music.current_page_number}</div></li>
                                                                <li  className={music.links.next ? "page-item " : "page-item disabled"} style={{cursor:"pointer"}}>
                                                                    <div onClick={()=>handlepagination(music.links.next)} className="page-link" >Next</div>
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

CategoryList.getInitialProps = async () => {
    const request2 = await axios({
        method: "GET",
        url: port + "/api/categories",
    })
    const answer = await request2.data;
    return { data: answer }
}
export default CategoryList