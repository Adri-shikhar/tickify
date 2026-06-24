"use client";

import Image from "@/Components/Image";

export default function AboutPage() {
  return (
    <div className="page-bg mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-gray-200 shadow-md lg:h-[420px]">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80"
            alt="Travel with Tickify"
            fill
            className="object-cover"
            fallbackClassName="h-full w-full"
          />
        </div>

        <div>
          <h1 className="text-3xl font-black text-teal-600">About Tickify</h1>

          <p className="mt-6 text-sm leading-relaxed text-gray-600">
            Tickify is a modern, user-friendly online ticket booking platform designed to simplify
            your travel experience. Our platform provides real-time seat availability so you can book
            your ticket instantly with confidence. Safety and reliability are at the core of our
            services, ensuring that every journey is secure and hassle-free. Tickify aims to reduce
            travel planning stress by offering a seamless, intuitive interface. Our platform supports
            secure online payments, giving peace of mind for every transaction. With Tickify, you can
            manage bookings, cancellations, and refunds directly from your dashboard. Our mission is
            to empower travelers to explore new destinations efficiently and affordably. Tickify
            promotes transparency, providing clear information about ticket prices, taxes, and
            additional fees. Our team works tirelessly to partner with reliable vendors and transport
            providers. We value user feedback and continuously update the platform based on customer
            needs. Tickify is designed for solo travelers, families, and business professionals alike.
            Our vision is to become the most trusted and widely used ticket booking platform in the
            country. By using Tickify, users save time, reduce stress, and gain a clear overview of all
            travel options. The platform encourages responsible travel by highlighting safe and
            verified transportation services. Tickify supports multiple payment methods to make the
            booking process convenient for everyone. With 24/7 customer service, Tickify ensures that
            help is always available if needed.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Our mission is to make travel planning seamless for everyone. From buses to luxury coaches,
            Tickify ensures that you reach your destination comfortably and on time. Join thousands of
            happy travelers and experience the future of ticket booking today.
          </p>
        </div>
      </div>
    </div>
  );
}
