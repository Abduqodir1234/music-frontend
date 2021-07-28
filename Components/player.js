import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
const Player = ()=>{
    return (
        <div>
            <AudioPlayer
                style={{backgroundColor:"#ff1f1f",color:"white"}}
                autoPlayAfterSrcChange
                src="https://www.bensound.com/bensound-music/bensound-buddy.mp3"   
                onPlay={e => console.log("onPlay")}
                showDownloadProgress
                showSkipControls
                header="Salom Qo'shigi"
                // other props here
            />
        </div>
    )
}
export default Player;