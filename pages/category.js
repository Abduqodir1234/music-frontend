import { Grid } from "@material-ui/core"
import Image from "next/image"
import picture from "../public/picture.png"
import AppsIcon from "@material-ui/icons/Apps"
import axios from "axios"
import { port } from "../port"
import "bootstrap/dist/css/bootstrap.min.css"

const CategoryList = ({ data }) => {
    console.log(data)
    return (
        <div style={{ marginLeft: "40px", marginRight: "40px", marginBottom: "150px" }}><br /><br />
            <h3 style={{}}> <AppsIcon style={{ color: "red", marginBottom: "3px" }} /> Categories</h3><br />
            <Grid container style={{ marginRight: "20px", marginLeft: "30px" }} >
                {data.map(category => <Grid key={category.id} item xs={3} md={2} lg={2} style={{ marginRight: "20px", marginBottom: "10px", borderRadius: "105px" }}>
                    <div style={{ borderRadius: "15px", overflow: "hidden" }}>
                        <Image src={port + category.photo} width={200} height={200} />
                    </div>
                    <div style={{ textAlign: "center" }}>{category.title}</div>

                </Grid>)}

            </Grid>

        </div >
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