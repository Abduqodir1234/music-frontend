
import React, { useRef, useState } from "react";
import picture from "../public/picture.png"
import Image from "next/image";
import { useWindowSize } from "./Navbar";
import { useSelector } from "react-redux";
import { port } from "../port";



export default function DesktopMainCarousel() {
    const artists = useSelector(state => state.main.artists);
    const topmusics = useSelector(state => state.main.top_songs);
    const playlist = useSelector(state => state.main.category);
    const size = useWindowSize()

    return (
        <div style={{ width: "100%", height: "100%" }}>
            Salom
        </div>
    );
}