import {artist_category_id, port} from "../port";
import "bootstrap/dist/css/bootstrap.min.css"
import Image from "next/image"
import {useDispatch, useSelector} from 'react-redux'
import get_category_with_music from "../Redux/Actions/get_category_with_songs"
import axios from "axios"
import chosen_category from "../Redux/Actions/chosen_catgory";
import picture3 from "../public/noimage.jpg";
import {useEffect} from "react";
const CategoryNavigation = ({ data }) => {
    const dispatch = useDispatch()
    const category_id = useSelector(state=>state.main.category_id)
   const handleclick = (id, title) => {
        dispatch(chosen_category(title))
        axios.get(port + "/api/songs/category/" + id)
            .then(response => {
                dispatch(get_category_with_music(response.data))
            })
            .catch(errors => {
                console.log(errors)
            })
    }
    useEffect(()=>{
         axios.get(port + "/api/songs/category/" + category_id)
            .then(response => {
                dispatch(get_category_with_music(response.data))
                dispatch(chosen_category(response.data.results[0].category.title))
            })
            .catch(errors => {
                console.log(errors)
            })
    },[])
    return (
        <div>
            <div className="containere">
                <div className="category_navigation mt-sm-5 mt-lg-0 mt-md-0 mt-5"><br />
                    {data.category.map(category => (
                        <div
                            style={{ marginBottom: "100px" }}
                            key={category.id}
                            className="category_navigation_container"
                            onClick={() => handleclick(category.id, category.title)}
                        >
                            <div className="container-content text-center">
                                <Image className="content-img" src={category.photo2 ? port +  category.photo2 :picture3} width="50" height="50" style={{ marginLeft: "20px" }} /><br />
                                <div className="category_navigation_text" style={{fontSize:"small"}}>{category.title}</div>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>

        </div>
    )
}
export default CategoryNavigation;