import { CloseSharp } from '@material-ui/icons';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { port } from '../port';
import close_player from "../Redux/Actions/closeplayer"
import get_music_id from "../Redux/Actions/get_music_id"

const Player2 = () => {
    const display_player = useSelector(state => state.main.player_display)
    const music_id = useSelector(state => state.main.plays_music_id)
    const dispatch = useDispatch()
    const info = useSelector(state => state.main.playing_music_info)
    const closePlayer = () => {
        dispatch(close_player())
        dispatch(get_music_id(undefined))
    }

    return (
        <div>
            {display_player
                ?
                <div style={{ position: "relative" }}>
                    <div>
                        <AudioPlayer
                            style={{ backgroundColor: "white", color: "black", boxShadow: "2px -12px 5px 0px lavender" }}
                            autoPlayAfterSrcChange
                            src={port + info.music_file}
                            onPlay={e => console.log("onPlay")}
                            showDownloadProgress
                            header={info.artist + "-" + info.title}
                            autoPlay
                        />
                    </div>
                    <div style={{ position: "absolute", zIndex: 1000000000, bottom: "80px", right: '10px', cursor: "pointer" }}>
                        <CloseSharp onClick={closePlayer} />
                    </div>
                </div>
                :
                ""
            }
        </div>
    )
}
export default Player2;