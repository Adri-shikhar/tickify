"use client";

import Image from "@/Components/Image";

const leftFeatures = [
  {
    title: "Easy Ticket Booking",
    text: "Book bus tickets in minutes with a simple, user-friendly interface.",
  },
  {
    title: "Fast Confirmation",
    text: "Get instant booking confirmation without waiting or extra steps.",
  },
];

const rightFeatures = [
  {
    title: "Affordable Pricing",
    text: "Transparent pricing with no hidden charges on ticket bookings.",
  },
  {
    title: "Multiple Transports",
    text: "Get multiple transport facilities in one place.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="page-bg mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h2 className="text-center text-3xl font-black bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
        Why choose us?
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-gray-500">
        From route information to secure payments, Tickify gives you a smooth and reliable booking
        experience.
      </p>

      <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-3">
        <div className="flex flex-col gap-10 text-right">
          {leftFeatures.map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-bold text-blue-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="relative mx-auto h-64 w-full max-w-md overflow-hidden rounded-2xl bg-gray-900 shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
            alt="Tickify booking platform"
            fill
            className="object-cover opacity-90"
            fallbackClassName="h-full w-full"
          />
        </div>

        <div className="flex flex-col gap-10 text-left">
          {rightFeatures.map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-bold text-blue-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
