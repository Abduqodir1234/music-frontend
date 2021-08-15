
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import picture from "../public/picture.png"
import picture2 from "../public/play.svg"
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import axios from "axios"
import Image from "next/image";
import { useWindowSize } from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import { port } from "../port";
import get_music_id from "../Redux/Actions/get_music_id"
import open_player from "../Redux/Actions/openplayer"
import get_one_music_info from "../Redux/Actions/get_one_music_info"
import Marquee from "react-fast-marquee";
import { GetApp } from "@material-ui/icons";
import { useRouter } from "next/dist/client/router";
// // install Swiper modules
// SwiperCore.use([Pagination]);


export default function TopMusics() {
  const top_songs = useSelector(state => state.main.top_songs)
  const dispatch = useDispatch()
  const musichandle = (id) => {
    axios.get(port + "/api/songs/" + id)
      .then(response => {
        dispatch(get_one_music_info(response.data))
      })
      .catch(error => {
        console.log(error)
      })
    dispatch(get_music_id(id))
    dispatch(open_player())
  }
  const router = useRouter()
  const download = (id) => {
    axios.get(port + "/api/download/song/" + id)
        .then(response=>{
          router.push(response.data.url)
        })

  }
  const size = useWindowSize()
  return (
    <div className="col-md-10">
      {top_songs.map(category =>
        <div
          className="col-md-5 col-lg-5 col-12"
          key={category.id}
          style=
          {{
            backgroundColor: "white",
            borderRadius: "15px",
            paddingLeft: "15px",
            marginBottom: "10px",
            marginRight: "10px",
            marginLeft: "10px",
            paddingTop: "20px",
            paddingBottom: "0px",
            paddingRight: "15px"
          }}

        >
          <div className="row" >
            <div
              onClick={() => musichandle(category.id)}
              className="col-lg-1 col-md-2 col-sm-2 col-2"
              style=
              {{
                borderRadius: "15px",
                overflow: "hidden",
                height: "50px",
                width: "50px"
              }}
            >
              <Image
                src={picture2}
                width={200}
                height={200}
              />
            </div>
            <div
              className="col-lg-9 col-md-7 col-sm-8 col-7"
              onClick={() => musichandle(category.id)}
              style={{ textAlign: "justify", overflow: "hidden" }}>
              <Marquee speed="30" gradient="0" pauseOnHover={true}>{category.title}</Marquee>
            </div>
            <div className="col-lg-1 col-md-1 col-sm-1 col-1">
              <GetApp onClick={() => download(category.id)} style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
      )
      }
    </div>
  )
}