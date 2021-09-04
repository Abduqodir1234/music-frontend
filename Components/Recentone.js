
import React from "react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import { useDispatch, useSelector } from "react-redux";
import MusicContainer from "./SubComponents/MusicContainer";


export default function TopMusics() {
    const top_songs = useSelector(state => state.main.recent_ones)
    return (
        <div className="col-md-10">
            <MusicContainer musicList={top_songs} />
        </div>
    )
}