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
    // 
    return (
        <div>
            {display_player
                ?
                <div style={{ position: "relative" }}>
                    <div>
                        <AudioPlayer
                            style={{ backgroundColor: "white", color: "black", boxShadow: "2px -12px 5px 0px lavender" }}
                            autoPlayAfterSrcChange
                            src="https://r2---sn-njpxojx01-u5ne.googlevideo.com/videoplayback?expire=1628695870&ei=3pgTYZu3NJeh7QTZr6TgDQ&ip=91.188.157.252&id=o-AL7_Tt6h2AE9UkMobVJf-rc4PgGjGZNuTW_JAbfMurTO&itag=251&source=youtube&requiressl=yes&mh=iB&mm=31%2C29&mn=sn-njpxojx01-u5ne%2Csn-35153iuxa-unx6&ms=au%2Crdu&mv=m&mvi=2&pl=22&initcwndbps=242500&vprv=1&mime=audio%2Fwebm&ns=YzgjlaI1LyTylu7dEsMuPQEG&gir=yes&clen=4161886&dur=239.541&lmt=1619526286419922&mt=1628674148&fvip=4&keepalive=yes&fexp=24001373%2C24007246&c=WEB&txp=5432434&n=UthDdokXghJWxge9fEp&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgFmsAlpG1kZV0IgCi7s8xPET3tqpZNdXo8suJDULUSnMCIQCLN5pI3xbpSb0iyjsAiJ0aq-oAlk6WZOjBOwp4PlfvLQ%3D%3D&sig=AOq0QJ8wRQIhALlFENgosWu2fj5HSeEJDhnMuJ2BZO9LZzna1CHy6dmGAiBKgHhvE1oqqauG4Q0aM_5kmIX6ke5u99Av78ZBoex_IA=="
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