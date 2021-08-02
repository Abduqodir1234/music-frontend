import { Grid } from "@material-ui/core"
import Image from "next/image"
import AppsIcon from "@material-ui/icons/Apps"
import axios from "axios"
import { port } from "../port"
import "bootstrap/dist/css/bootstrap.min.css"
import CategoryNavigation from "../Components/CategoryNavigation"
import { useSelector, useDispatch } from "react-redux"
import get_music_id from "../Redux/Actions/get_music_id"
import open_player from "../Redux/Actions/openplayer"
import { ArrowDownward, DoneTwoTone, GetApp } from "@material-ui/icons"
import Link from "next/link"
import { useRouter } from "next/dist/client/router"
import get_one_music_info from "../Redux/Actions/get_one_music_info"
import chosen_category from "../Redux/Actions/chosen_catgory"
import { useEffect } from "react"
const CategoryList = ({ data }) => {
    const music = useSelector(state => state.main.one_category_with_musics)
    const category = useSelector(state => state.main.chosen_category_title)
    const dispatch = useDispatch()
    dispatch(get_one_music_info(data.music))
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
        let url = port + "/api/download/song/" + id
        router.push(url)
    }
    return (
        <CategoryNavigation data={data} className="fixed-left h-100">
            <div className="h-100" style={{ marginLeft: "40px", marginRight: "40px", marginBottom: "150px", backgroundColor: "#f5feff", minHeight: "100%" }}><br /><br />
                <div style={{ backgroundColor: "#f5feff" }}>
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
                                        {music.map(category =>
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
                                                onClick={() => musichandle(category.id)}
                                            >
                                                <div className="row">
                                                    <div className="col-lg-1 col-md-1 col-2" style={{ borderRadius: "15px", overflow: "hidden", height: "50px", width: "50px" }}>
                                                        <Image src={category.photo ? port + category.photo : "https://api.wolt.uz/storage/images/noimg.jpg"} width={200} height={200} />
                                                    </div>
                                                    <div className="col-lg-9 col-md-10 col-8" style={{ textAlign: "center", overflow: "hidden" }}>
                                                        {category.artist}-{category.title}
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
        </CategoryNavigation >

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