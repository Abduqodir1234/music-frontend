
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import picture from "../public/picture.png"

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import Image from "next/image";
import { useWindowSize } from "./Navbar";

// // install Swiper modules
// SwiperCore.use([Pagination]);


export default function TopPlaylists() {
  const size = useWindowSize()
  return (
    <>
      <Swiper slidesPerView={3} spaceBetween={15} pagination={{
        "clickable": true
      }} breakpoints={{
        "640": {
          "slidesPerView": 1,
          "spaceBetween": 2,
        },
        "768": {
          "slidesPerView": 2,
          "spaceBetween": 6,
        },
        "1024": {
          "slidesPerView": 3,
          "spaceBetween": 10,
        }
      }} className="mySwiper">
        <SwiperSlide>
          <div >
            <Image className="crsimg" width={140} height={140} src={picture}></Image><br />
            Slide 1
          </div>
        </SwiperSlide>
        <SwiperSlide >
          <div >
            <Image className="crsimg" width={140} height={140} src={picture}></Image><br />
            Slide 2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <Image className="crsimg" width={140} height={140} src={picture}></Image><br />
            Slide 3
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <Image className="crsimg" width={140} height={140} src={picture}></Image><br />
            Slide 4
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <Image className="crsimg" width={140} height={140} src={picture}></Image><br />
            Slide 5
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <Image className="crsimg" width={140} height={140} src={picture}></Image><br />
            Slide 6
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <Image className="crsimg" width={140} height={140} src={picture}></Image><br />
            Slide 7
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <Image className="crsimg" width={140} height={140} src={picture}></Image><br />
            Slide 8
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <Image className="crsimg" width={140} height={140} src={picture}></Image><br />
            Slide 9
          </div>
        </SwiperSlide>
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
    </SwiperSlide> */}
          {/* <SwiperSlide>
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
    <SwiperSlide>
      <div >
      
      </div>
    </SwiperSlide> */}
        </div> : ""}
      </Swiper>
    </>
  )
}