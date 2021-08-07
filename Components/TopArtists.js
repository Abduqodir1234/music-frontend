
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import picture from "../public/picture.png"

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"


// import Swiper core and required modules
import SwiperCore, {
  Pagination
} from 'swiper/core';
import Image from "next/image";
import { useWindowSize } from "./Navbar";
import { useSelector } from "react-redux";
import { port } from "../port";
import Marquee from "react-fast-marquee";

// // install Swiper modules
// SwiperCore.use([Pagination]);


export default function TopArtists() {
  const artists = useSelector(state => state.main.artists)
  const size = useWindowSize()
  return (
    <>
      <Swiper slidesPerView={3} spaceBetween={15} pagination={{
        "clickable": true
      }} breakpoints={{
        "640": {
          "slidesPerView": 2,
          "spaceBetween": 4,
        },
        "768": {
          "slidesPerView": 4,
          "spaceBetween": 8,
        },
        "1024": {
          "slidesPerView": 6,
          "spaceBetween": 12,
        }
      }} className="mySwiper">
        {artists.map(artist =>
          <SwiperSlide key={artist.id}>
            <div >
              <Image className="crsimg" width={100} height={100} src={port + artist.photo}></Image><br />
              <Marquee style={{width:'100px'}} speed={30} gradient="none" >{artist.name} <div style={{width:"20px"}}></div></Marquee>
            </div>
          </SwiperSlide>
        )}
        {size.width > 889 ? <div><SwiperSlide>
          <div >

          </div>
        </SwiperSlide>
          <SwiperSlide>
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
    </SwiperSlide>
    <SwiperSlide>
      <div >
      
      </div>
    </SwiperSlide> */}
          {/* <SwiperSlide>
      <div >
      
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div >
      
      </div>
    </SwiperSlide> */}

        </div> : ""}
      </Swiper>
    </>
  )
}