
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import picture from "../public/picture.png"

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"



import Image from "next/image";
import { useWindowSize } from "./Navbar";
import { useSelector } from "react-redux";

// // install Swiper modules
// SwiperCore.use([Pagination]);


export default function TopMusics() {
  const top_songs = useSelector(state => state.main.top_songs)
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
          "slidesPerView":9,
          "spaceBetween": 12,
        }
      }} className="mySwiper">
        {top_songs.map(song =>
          <SwiperSlide key={song.id}>
            <div >
              <Image className="crsimg"  width={300} height={300} src={picture}></Image><br />
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