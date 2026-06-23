"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./background-swiper.css";

const busImages = [
  "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1717660778019-bdfdd4c7108b?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1730131836048-23bbc59b0a87?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1478359900967-91ec0c6edc60?auto=format&fit=crop&w=1920&q=80",
];

export default function BackgroundSwiper() {
  return (
    <div className="background-swiper">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {busImages.map((src) => (
          <SwiperSlide key={src}>
            <img src={src} alt="Bus" draggable={false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
