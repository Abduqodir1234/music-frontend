
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import picture from "../public/picture.png"
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import Image from "next/image";
import { useWindowSize } from "./Navbar";
import { port } from "../port";
import axios from "axios";
import { useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import picture3 from "../public/noimage.jpg";

// // install Swiper modules
// SwiperCore.use([Pagination]);

const Carousel = () => {
  const data = useSelector(state => state.main.category);
  const size = useWindowSize()
  return (
    <>
      <Swiper slidesPerView={3} spaceBetween={15} pagination={{
        "clickable": true
      }} breakpoints={{
        "640": {
          "slidesPerView": 3,
          "spaceBetween": 2,
        },
        "768": {
          "slidesPerView": 5,
          "spaceBetween": 7
        },
        "1024": {
          "slidesPerView": 6,
          "spaceBetween": 10
        }
      }} className="mySwiper">

        {data.category.map(category =>
          <SwiperSlide key={category.id}>
            <div style={{color:"black"}}>
              <Image className="crsimg" width={100} height={100} src={category.photo2  ? category.photo2 :picture3}></Image><br />
             <Marquee style={{width: '100px'}} speed={30} gradient="none" > {category.title}<div style={{width:"20px"}}></div></Marquee>
            </div>
          </SwiperSlide>
        )}
        {
          size.width > 889 ? <div><SwiperSlide>
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
    </SwiperSlide>*/}</div> : ""
        }
      </Swiper>
    </>
  )
}
export default Carousel;