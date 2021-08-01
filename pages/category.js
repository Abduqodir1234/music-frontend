import { Grid } from "@material-ui/core"
import Image from "next/image"
import picture from "../public/picture.png"
import AppsIcon from "@material-ui/icons/Apps"
import axios from "axios"
import { port } from "../port"
import "bootstrap/dist/css/bootstrap.min.css"
import CategoryNavigation from "../Components/CategoryNavigation"
import { useSelector } from "react-redux"
const CategoryList = ({ data }) => {
    const music = useSelector(state => state.main.one_category_with_musics)
    return (
        <CategoryNavigation data={data}>
            <div style={{ marginLeft: "40px", marginRight: "40px", marginBottom: "150px" }}><br /><br />
                <h3 style={{}}> <AppsIcon style={{ color: "red", marginBottom: "3px" }} /> {music[0].category.title}</h3><br />
                <Grid container style={{ marginRight: "20px", marginLeft: "30px" }} >
                    {music.map(category => <Grid key={category.id} item xs={4} md={3} lg={2} style={{ marginRight: "20px", marginBottom: "10px", borderRadius: "105px" }}>
                        <div style={{ borderRadius: "15px", overflow: "hidden" }}>
                            <Image src={category.photo ? port + category.photo : "https://api.wolt.uz/storage/images/noimg.jpg"} width={200} height={200} />
                        </div>
                        <div style={{ textAlign: "center" }}>{category.title}</div>

                    </Grid>)}

                </Grid>

            </div >
        </CategoryNavigation>

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