"use client"
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import Images from './Images';
import VideoPreview from './VideoPreview';


export default function VideosSlider({data}) {

 

    const swiperRef = useRef(null); // Reference for Swiper instance



    const handleMouseEnter = () => {
        if (swiperRef.current && swiperRef.current.autoplay) {
            swiperRef.current.autoplay.stop(); // Stop autoplay
        }
    };

    const handleMouseLeave = () => {
        if (swiperRef.current && swiperRef.current.autoplay) {
            swiperRef.current.autoplay.start(); // Restart autoplay
        }
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Swiper
                ref={swiperRef} // Assign ref to Swiper
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                      },
                    999: {
                      slidesPerView: 3,
                    },
                  }}
                modules={[Navigation, Autoplay]} // Ensure modules are registered
            >
                {data && data.map((item, index) => (
                    <SwiperSlide key={index}>
                      <VideoPreview  
                      type="small"
                      data={item}
                      desc
                      />
   </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
