"use client";

import NextImage from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./background-swiper.css";

// These were previously raw <img> tags pointing at full-size Unsplash files,
// so the landing page downloaded ~2.4MB before it settled — for a slider that
// shows one frame at a time. Going through next/image means the browser gets a
// resized AVIF/WebP, and only the first slide is fetched up front.
const slides = [
  {
    src: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=1920&q=80",
    alt: "Coach parked at a terminal at dusk",
  },
  {
    src: "https://images.unsplash.com/photo-1717660778019-bdfdd4c7108b?auto=format&fit=crop&w=1920&q=80",
    alt: "Intercity bus on an open highway",
  },
  {
    src: "https://images.unsplash.com/photo-1730131836048-23bbc59b0a87?auto=format&fit=crop&w=1920&q=80",
    alt: "Passengers boarding a long-distance coach",
  },
  {
    src: "https://images.unsplash.com/photo-1478359900967-91ec0c6edc60?auto=format&fit=crop&w=1920&q=80",
    alt: "Road winding through countryside at sunrise",
  },
];

export default function BackgroundSwiper() {
  return (
    <div className="background-swiper">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ dynamicBullets: true }}
        loop
        speed={900}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.src}>
            <NextImage
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              // Only the first frame is on the critical path; the rest load
              // lazily as the slider reaches them.
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              quality={70}
              className="object-cover"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scrim so the headline stays legible over any frame, rather than
          relying on a drop-shadow alone */}
      <div className="background-swiper__scrim" aria-hidden="true" />
    </div>
  );
}
