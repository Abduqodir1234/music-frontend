
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
import MusicContainer from "./SubComponents/MusicContainer";
// // install Swiper modules
// SwiperCore.use([Pagination]);


export default function TopMusics() {
  const top_songs = useSelector(state => state.main.top_songs)
  return (
    <div className="col-md-10">
      <MusicContainer musicList={top_songs} />
    </div>
  )
}