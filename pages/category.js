import Image from "next/image"
import AppsIcon from "@material-ui/icons/Apps"
import axios from "axios"
import { port } from "../port"
import "bootstrap/dist/css/bootstrap.min.css"
import CategoryNavigation from "../Components/CategoryNavigation"
import { useSelector, useDispatch } from "react-redux"
import get_music_id from "../Redux/Actions/get_music_id"
import open_player from "../Redux/Actions/openplayer"
import { FavoriteBorder, GetApp } from "@material-ui/icons"
import { useRouter } from "next/dist/client/router"
import get_one_music_info from "../Redux/Actions/get_one_music_info"
import chosen_category from "../Redux/Actions/chosen_catgory"
import picture2 from "../public/play.svg"
import { useEffect, useState } from "react"
import Marquee from "react-fast-marquee";
import get_category_with_music from "../Redux/Actions/get_category_with_songs";
import MusicContainer from "../Components/SubComponents/MusicContainer"
const CategoryList = ({ data }) => {
    const music = useSelector(state => state.main.one_category_with_musics) || []
    const category = useSelector(state => state.main.chosen_category_title)
    const [category2,setcategory2] = useState(category)
    useEffect(()=>{
         setcategory2(category)
    },[category2,music])
    const dispatch = useDispatch()
    const handleLike = (id) =>{
        axios.post(`${port}/api/category/like/${category.id}`)
        .then(()=>{
            let array;
            array = Object.assign({},category2)
            array.likes += 1
            setcategory2(array)
            dispatch(chosen_category(array))
        })
        .catch((e)=>{
            console.log(e)
            return;
        })
    }
    
    const handlepagination = (url) =>{
        axios.get(url)
            .then(response=>{
                setcategory2(response.data)
                dispatch(get_category_with_music(response.data))
                dispatch(chosen_category(response.data.results[0].category.title))
            })
            .catch(eror=>{
                console.log(eror)
            })
    }
    useEffect(() => {
        dispatch(chosen_category(data.category[0]))
        axios.get(port + "/api/songs/category/" + data.category[0].id )
            .then(response=>{
                setcategory2(response.data)
                dispatch(get_category_with_music(response.data))
            })
            .catch(eror=>{
                console.log(eror)
            })
    }, [])
    return (
        <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="row">
                <div className="col-lg-1 col-xl-1 col-md-1 col-sm-1 col-2" >
                    <CategoryNavigation data={data} className="fixed-left h-100" />
                </div>
                <div className="col-lg-11 col-xl-11 col-md-11 col-sm-1 col-10">

                        <div className="h-100" style={{ marginLeft: "40px", marginRight: "40px", marginBottom: "150px", backgroundColor: "#defaff", minHeight: "100%" }}><br /><br />
                            <div style={{ backgroundColor: "#defaff" }}>
                                {category2 !== ""
                                    ?
                                    <>
                                        <h3 style={{}}>
                                            <AppsIcon style={{ color: "red", marginBottom: "3px" }} /> 
                                            {category2.title}
                                            <label onClick={()=>handleLike()} style={{cursor:"pointer"}}>
                                            <FavoriteBorder style={{marginLeft:"10px",color:"red"}} />
                                            <label  style={{fontSize:"small"}}>{category2.likes}</label>
                                        </label>
                                        </h3>
                                        <br/>
                                    </>
                                    :
                                    ""
                                }
                                {
                                    music !== [] && music.length !== 0 ?
                                        (
                                            <>
                                                {music.length !== 0?
                                                <>
                                                    <MusicContainer musicList={music.results || []} />
                                                    <nav aria-label="Page navigation example">
                                                        <ul className="pagination justify-content-center">
                                                            <li className={ music?.links?.previous ? "page-item" : "page-item disabled"} style={{cursor:"pointer"}}>
                                                                <div onClick={()=>handlepagination(music?.links?.previous)} className="page-link" >Previous</div>
                                                            </li>
                                                            <li className="page-item"><div className="page-link">{music.current_page_number}</div></li>
                                                            <li  className={music?.links?.next ? "page-item " : "page-item disabled"} style={{cursor:"pointer"}}>
                                                                <div onClick={()=>handlepagination(music?.links?.next)} className="page-link" >Next</div>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </>    
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

CategoryList.getInitialProps = async () => {
    const request2 = await axios({
        method: "GET",
        url: port + "/api/categories",
    })
    const answer = await request2.data;
    return { data: answer }
}
export default CategoryList