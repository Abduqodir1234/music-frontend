import Head from 'next/head'
import Image from 'next/image'
import Carousel from '../Components/Carousel'
import styles from '../styles/Home.module.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { useWindowSize } from '../Components/Navbar'
import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import TopMusics from '../Components/TopMusics'
import TopArtists from '../Components/TopArtists'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import TopPlaylists from '../Components/TopPlaylists'
import axios from "axios"
import { port } from "../port"
import { useDispatch } from 'react-redux'
import get_category from "../Redux/Actions/getcategory"
import get_artists from '../Redux/Actions/getartists'
import get_top_songs from '../Redux/Actions/get_top_songs'
import MobileCarouselGroup from "../Components/MobileCarouselGroup";
export default function Home({ data, artists, top_songs }) {
  const dispatch = useDispatch()
  dispatch(get_category(data))
  dispatch(get_artists(artists))
  dispatch(get_top_songs(top_songs))
  const size = useWindowSize()
  let style = {}
  if (size.width < 889) {
    style = {
      zIndex: "10000",
      marginBottom: "56px"
    }
  }
  else {
    style = {
      zIndex: "10000"
    }
  }
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ paddingLeft: "30px", paddingTop: "20px", paddingRight: "30px", marginBottom: "200px" }}>

        {size.width <= 661 ? <MobileCarouselGroup />: ""}

      </main><br />


    </div>
  )
}
Home.getInitialProps = async () => {
  const request2 = await axios({
    method: "GET",
    url: port + "/api/categories",
  })

  const answer = await request2.data;
  const request2_1 = await axios({
    method: "GET",
    url: port + "/api/artists",
  })

  const artist = await request2_1.data;
  const request2_2 = await axios({
    method: "GET",
    url: port + "/api/top/musics",
  })

  const topsongs = await request2_2.data;
  return { data: answer, artists: artist, top_songs: topsongs }
}
