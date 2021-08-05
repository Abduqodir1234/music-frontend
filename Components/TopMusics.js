
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
  const size = useWindowSize()
  return (
    <>
      <Swiper slidesPerView={3} spaceBetween={15} pagination={{
        "clickable": true
      }} breakpoints={{
        "640": {
          "slidesPerView": 3,
          "spaceBetween": 4,
        },
        "768": {
          "slidesPerView": 6,
          "spaceBetween": 8,
        },
        "1024": {
          "slidesPerView": 9,
          "spaceBetween": 12,
        }
      }} className="mySwiper">
        {top_songs.map(song =>
          <SwiperSlide key={song.id} onClick={() => musichandle(song.id)}>
            <div  >
              <Image className="crsimg" width={300} height={300} src={picture2}></Image>
              {/* <div class="overlay">
                <div class="text">
                  <PlayCircleOutlineOutlinedIcon
                    style=
                    {{
                      width: "50px",
                      height: "50px",
                      fontWeight: "bolder",
                      color: "black"
                    }}
                  />
                  <div
                    style=
                    {{
                      fontSize: "xx-small",
                      width: "100px",
                      color: "black",
                      fontWeight: 'bold',
                      overflow: "hidden",
                      wordBreak: "break-all"
                    }}
                  >
                    {song.artist}-{song.title}
                  </div>
                </div>
              </div> */}
              <br />
              <div style={{ fontWeight: "light", fontSize: "small" }}></div>
              {song.artist}-{song.title}

            </div>

          </SwiperSlide>)}
        {size.width > 889 ? <div><SwiperSlide>
          <div >

          </div>
        </SwiperSlide>
          <SwiperSlide>
            <div >

            </div>
          </SwiperSlide>
          {/* <SwiperSlide>
      <div >
      
      </div>
    </SwiperSlide> */}
          {/* <SwiperSlide>
      <div >
      
      </div>
    </SwiperSlide> */}
        </div> : ""}
      </Swiper>
    </>
  )
}