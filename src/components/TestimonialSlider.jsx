"use client"
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { useModalContext } from '@/context/modalContext'; // Assuming you have a modal context defined
import Images from './Images';

export default function TestimonialSlider({data}) {

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
                //slidesPerView={3}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
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
                  
            >
                {data && data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="card rounded-[30px] overflow-hidden p-[30px] grid gap-[20px] h-full flex-col sm:min-h-[400px]">
                        <p dangerouslySetInnerHTML={{ __html: item.content} } />
                        <div className='flex items-center gap-[13px]'>

                
                     {item?.featuredImage &&  <Images
                                src={item?.featuredImage?.node?.sourceUrl}
                                imageurl={item?.featuredImage?.node?.sourceUrl}
                                styles={''}
                                quality={100}
                                width={'50'}
                                height={'50'}
                                alt={item?.featuredImage?.node?.altText}
                                placeholder={false}
                                classes={'block size-[50px] rounded-full object-cover'}
                               />
                     }
                             <small className='inline-block'>{item.title}</small>
                        </div>
                       
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}




