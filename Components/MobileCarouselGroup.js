import MusicNoteIcon from "@material-ui/icons/MusicNote";
import TopMusics from "./TopMusics";
import AppsIcon from "@material-ui/icons/Apps";
import Carousel from "./Carousel";
import PersonIcon from "@material-ui/icons/Person";
import TopArtists from "./TopArtists";

const MobileCarouselGroup = () =>{
    return (
        <div>
            <div >
                <h4><MusicNoteIcon style={{ marginBottom: "3px", color: "red", marginRight: "3px" }} />Top Musics</h4><br />
                <div style={{ marginLeft: "20px", marginRight: "20px" }}>  <TopMusics /></div>
            </div><br />
            <div>
                <h4><AppsIcon style={{ marginBottom: "3px", color: "red", marginRight: "3px" }} />Top PlayList</h4><br />
                <div style={{ marginLeft: "20px", marginRight: "20px" }}><Carousel /></div> <br />
            </div><br/>
            <div>
                <h4><PersonIcon style={{ marginBottom: "3px", color: "red", marginRight: "3px" }} />Top Artists</h4><br />
                <div style={{ marginLeft: "20px", marginRight: "20px" }}> <TopArtists /></div>
            </div><br />
            {/*<div>*/}
            {/*  <h4><PlaylistPlayIcon style={{ marginBottom: "3px", color: "red", marginRight: "3px" }} />Top PlayLists</h4><br />*/}
            {/*  <TopPlaylists />*/}
            {/*</div>*/}

        </div>
    )


}

export default MobileCarouselGroup