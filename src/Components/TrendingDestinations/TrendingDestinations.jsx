"use client";

import Image from "@/Components/Image";

const topRow = [
  {
    name: "Chittagong",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
  },
  {
    name: "Dhaka",
    image: "https://images.unsplash.com/photo-1587474260587-136574528ed5?w=800&q=80",
  },
];

const bottomRow = [
  {
    name: "Rajshahi",
    image: "https://images.unsplash.com/photo-1519501025264-65bdfcbfc509?w=800&q=80",
    wide: false,
  },
  {
    name: "Rangpur",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    wide: true,
  },
  {
    name: "Sylhet",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    wide: false,
  },
];

function DestinationCard({ name, image, tall = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gray-200 ${
        tall ? "h-56 md:h-64" : "h-44 md:h-52"
      }`}
    >
      <Image src={image} alt={name} fill className="object-cover" fallbackClassName="h-full w-full" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10">
        <p className="text-xl font-bold text-white">{name}</p>
      </div>
    </div>
  );
}

export default function TrendingDestinations() {
  return (
    <section className="page-bg mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h2 className="text-center text-3xl font-black bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
        Trending Destinations
      </h2>
      <p className="mt-2 text-center text-sm text-gray-500">
        Explore popular travel destinations across Bangladesh
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {topRow.map((place) => (
          <DestinationCard key={place.name} name={place.name} image={place.image} tall />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
        {bottomRow.map((place) => (
          <div key={place.name} className={place.wide ? "md:col-span-2" : ""}>
            <DestinationCard name={place.name} image={place.image} />
          </div>
        ))}
      </div>
    </section>
  );
}
