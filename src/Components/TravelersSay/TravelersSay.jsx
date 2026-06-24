"use client";

import Image from "@/Components/Image";

const reviews = [
  {
    name: "Rahim Ahmed",
    role: "Software Engineer • Dhaka",
    text: "Tickify made booking bus tickets incredibly easy. The seat selection and instant confirmation are excellent.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    featured: false,
  },
  {
    name: "Nusrat Jahan",
    role: "University Student • Chattogram",
    text: "The interface is clean and the payment process feels very secure. Tickify is my go-to platform.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    featured: true,
  },
  {
    name: "Tanvir Hasan",
    role: "Business Consultant • Sylhet",
    text: "A reliable platform with accurate schedules. Online booking feels effortless with Tickify.",
    stars: 4,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    featured: false,
  },
];

function Stars({ count }) {
  return (
    <div className="flex justify-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= count ? "text-amber-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function TravelersSay() {
  return (
    <section className="page-bg mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h2 className="text-center text-3xl font-black bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
        What Our Travelers Say
      </h2>
      <p className="mt-2 text-center text-sm text-gray-500">Trusted by travelers across Bangladesh</p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-center">
        {reviews.map((review) => (
          <div
            key={review.name}
            className={`rounded-2xl bg-white p-6 text-center shadow-md ${
              review.featured ? "md:scale-105 md:shadow-xl" : ""
            }`}
          >
            <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full">
              <Image
                src={review.image}
                alt={review.name}
                fill
                className="object-cover"
                fallbackClassName="h-full w-full"
              />
            </div>

            <p className="text-sm leading-relaxed text-gray-600">&ldquo;{review.text}&rdquo;</p>

            <div className="my-4">
              <Stars count={review.stars} />
            </div>

            <p className="font-bold text-blue-700">{review.name}</p>
            <p className="mt-1 text-xs text-gray-500">{review.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
