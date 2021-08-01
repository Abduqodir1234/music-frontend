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
import { Link } from "next/link"
const CategoryList = ({ data }) => {
    const music = useSelector(state => state.main.one_category_with_musics)
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
        <CategoryNavigation data={data}>
            <div style={{ marginLeft: "40px", marginRight: "40px", marginBottom: "150px", backgroundColor: "#f5feff" }}><br /><br />
                {
                    music !== [] && music.length !== 0 ?
                        (
                            <div style={{ backgroundColor: "#f5feff" }}>
                                <h3 style={{}}>
                                    <AppsIcon style={{ color: "red", marginBottom: "3px" }} /> {music[0].category.title}
                                </h3><br />

                                {music.map(category =>
                                    // <Grid container style={{ marginRight: "20px", marginLeft: "30px" }} >
                                    //     <Grid
                                    //         key={category.id}
                                    //         item xs={4}
                                    //         md={3}
                                    //         lg={2}
                                    //         style={{ marginRight: "20px", marginBottom: "10px", borderRadius: "105px" }}
                                    //         onClick={
                                    //             () => musichandle(category.id)
                                    //         }
                                    //     >
                                    <Grid key={category.id} container style={{ backgroundColor: "white", borderRadius: "15px", padding: "15px", width: "100%", marginBottom: "10px" }}>
                                        <Grid item lg={1} md={1} xs={1} style={{ borderRadius: "15px", overflow: "hidden" }}>
                                            <Image src={category.photo ? port + category.photo : "https://api.wolt.uz/storage/images/noimg.jpg"} width={200} height={200} />
                                        </Grid>
                                        <Grid item lg={10} md={10} xs={10} style={{ textAlign: "center" }}>
                                            {category.artist}-{category.title}
                                        </Grid>

                                        <Grid item lg={1} md={1} xs={1}>
                                            <Link href={port + "download/song/" + category.id}> <GetApp /> </Link>
                                        </Grid>
                                    </Grid>
                                    // </Grid>
                                    // </Grid>
                                )}
                            </div>
                        )
                        :
                        <h4>Choose any category to show musics related to clicked category</h4>
                }
            </div >
        </CategoryNavigation >

    )
}

CategoryList.getInitialProps = async (ctx) => {
    const request2 = await axios({
        method: "GET",
        url: port + "/api/categories",
    })
    const answer = await request2.data;
    return { data: answer }
}
export default CategoryList