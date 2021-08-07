import MusicNoteIcon from "@material-ui/icons/MusicNote";
import TopMusics from "./TopMusics";
import AppsIcon from "@material-ui/icons/Apps";
import Carousel from "./Carousel";
import PersonIcon from "@material-ui/icons/Person";
import TopArtists from "./TopArtists";
import {ArrowRight} from "@material-ui/icons";
import Recentone from "./Recentone"

const MobileCarouselGroup = () =>{
    return (
        <div style={{paddingTop: "50px"}}>
            <div >
                <h4><MusicNoteIcon style={{color:"red",marginBottom: "3px", marginRight: "3px" }} />Top10 Musics  </h4><br />
                <div style={{ marginLeft: "20px", marginRight: "20px" }}>  <TopMusics /></div>
            </div><br />
            <div >
                <h4><MusicNoteIcon style={{color:"red",marginBottom: "3px", marginRight: "3px" }} />Top10 Recent Musics</h4><br />
                <div style={{ marginLeft: "20px", marginRight: "20px" }}>  <Recentone /></div>
            </div><br />
            <div>
                <h4><AppsIcon style={{color:"red", marginBottom: "3px", marginRight: "3px" }} />Top PlayList<div style={{float:'right'}}><ArrowRight/> </div> </h4><br />
                <div style={{ marginLeft: "20px", marginRight: "20px" }}><Carousel /></div> <br />
            </div><br/>
            <div>
                <h4><PersonIcon style={{color:"red", marginBottom: "3px", marginRight: "3px" }} />Top Artists<div style={{float:'right'}}><ArrowRight/> </div> </h4><br />
                <div style={{ marginLeft: "20px", marginRight: "20px" }}> <TopArtists /></div>
            </div><br />
        </div>
    )


}

export default MobileCarouselGroup