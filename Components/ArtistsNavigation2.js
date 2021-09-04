import { port } from "../port";
import "bootstrap/dist/css/bootstrap.min.css"
import Image from "next/image"
import {useDispatch, useSelector} from 'react-redux'
import get_artist from "../Redux/Actions/get_artist";
import picture3 from "../public/noimage.jpg";
import get_artist_id from "../Redux/Actions/get_artist_id";
const ArtistsNavigation = ({set}) => {
    const dispatch = useDispatch()
    const all = useSelector(state=>state.main.all)
    const handleclick = (id, title) => {
        dispatch(get_artist_id(id))
        dispatch(get_artist(title))
    }
    return (
        <div>
            <div className="containere position-sticky top-0 left-0">
                <div className="category_navigation h-100" style={{paddingTop:"30px"}}><br />
                    {all.map(artist => (
                            <div
                                style={{ marginBottom: "100px" }}
                                key={artist.id}
                                className="category_navigation_container"
                                onClick={() => handleclick(artist.id, artist.name)}
                            >
                                <div className="container-content text-center">
                                    <Image 
                                        className="content-img"
                                        src={artist.photo ? port + artist.photo :picture3} 
                                        width="50" 
                                        height="50" 
                                        style={{ marginLeft: "20px" }} 
                                    />
                                    <br />
                                    <div 
                                        className="category_navigation_text"
                                        style={{fontSize:"small",wordBreak:"break-word",wordWrap:"break-word"}}
                                    >
                                        {artist.name}
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

        </div>
    )
}
export default ArtistsNavigation;
