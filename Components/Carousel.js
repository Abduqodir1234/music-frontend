
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import picture from "../public/picture.png"
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import Image from "next/image";
import { useWindowSize } from "./Navbar";
import { port } from "../port";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import Marquee from "react-fast-marquee";
import picture3 from "../public/noimage.jpg";
import chosen_category from "../Redux/Actions/chosen_catgory";
import get_category_id from "../Redux/Actions/get_category_id";
import {useRouter} from "next/dist/client/router";

// // install Swiper modules
// SwiperCore.use([Pagination]);

const Carousel = () => {
  const data = useSelector(state => state.main.category);
  const size = useWindowSize();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleclick = (id, title) => {
    dispatch(chosen_category(title))
    dispatch(get_category_id(id))
    router.push("/category")
  }
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
              <Image onClick={()=>handleclick(category.id,category.title)} className="crsimg" width={100} height={100} src={category.photo  ? port +  category.photo :picture3}></Image><br />
             <Marquee onClick={()=>handleclick(category.id,category.title)} style={{width: '100px'}} speed={30} gradient="none" > {category.title}<div style={{width:"20px"}}></div></Marquee>
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