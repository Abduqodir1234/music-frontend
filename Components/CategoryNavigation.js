import { port } from "../port";
import "bootstrap/dist/css/bootstrap.min.css"
import Image from "next/image"
import { useDispatch } from 'react-redux'
import get_category_with_music from "../Redux/Actions/get_category_with_songs"
import axios from "axios"
import chosen_category from "../Redux/Actions/chosen_catgory";
const CategoryNavigation = ({ children, data }) => {
    const dispatch = useDispatch()
    const handleclick = (id, title) => {
        dispatch(chosen_category(title))
        axios.get(port + "/api/sons/catgegory/" + id)
            .then(response => {
                dispatch(get_category_with_music(response.data))

            })
            .catch(errors => {
                console.log(errors)
            })
    }
    return (
        <div>
            <div className="containere">
                <div className="category_navigation" style={{paddingTop:"30px"}}><br />
                    {data.category.map(category => (
                        <div
                            style={{ marginBottom: "100px" }}
                            key={category.id}
                            className="category_navigation_container"
                            onClick={() => handleclick(category.id, category.title)}
                        >
                            <div className="container-content text-center">
                                <Image className="content-img" src={port + category.photo} width="50" height="50" style={{ marginLeft: "20px" }} /><br />
                                <div className="category_navigation_text">{category.title}</div>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>
            <div style={{ marginLeft: "100px"}}>
                {children}
            </div>
        </div>
    )
}
export default CategoryNavigation;