import { port } from "../port";
import "bootstrap/dist/css/bootstrap.min.css"
import Image from "next/image"
import {useDispatch, useSelector} from 'react-redux'
import get_artist from "../Redux/Actions/get_artist";
const ArtistsNavigation = ({ children}) => {
    const dispatch = useDispatch()
    const all = useSelector(state=>state.main.all)
    const handleclick = (id, title) => {
        dispatch(get_artist(title))
    }
    return (
        <div>
            <div className="containere">
                <div className="category_navigation" style={{paddingTop:"30px"}}><br />
                    {all.map(artist => (
                            <div
                                style={{ marginBottom: "100px" }}
                                key={artist.id}
                                className="category_navigation_container"
                                onClick={() => handleclick(artist.id, artist.name)}
                            >
                                <div className="container-content text-center">
                                    <Image className="content-img" src={port + artist.photo} width="50" height="50" style={{ marginLeft: "20px" }} /><br />
                                    <div className="category_navigation_text">{artist.name}</div>
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
export default ArtistsNavigation;
