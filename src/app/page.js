// Landing page (route: /)
import BackgroundSwiper from "@/Components/BackgroundSwiper";
import LatestTicker from "@/Components/LatestTicker";
import AdvertisementSection from "@/Components/AdvertisementSection";
import LatestTicketsSection from "@/Components/LatestTicketsSection";
import TrendingDestinations from "@/Components/TrendingDestinations";
import WhyChooseUs from "@/Components/WhyChooseUs";
import EasySteps from "@/Components/EasySteps";
import TravelersSay from "@/Components/TravelersSay";

export default function LandingPage() {
  return (
    <>
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <BackgroundSwiper />

        <div className="pointer-events-none relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center p-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-md sm:text-5xl">
            Welcome to Tickify
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/90 drop-shadow">
            Your ticket booking manager for buses, trains, flights, and events.
          </p>
        </div>
      </section>

      <div className="page-bg p-6">
        <LatestTicker />
      </div>

      <section className="page-bg mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="mb-2 text-center text-3xl font-black bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
          Latest Tickets
        </h2>
        <p className="mb-8 text-center text-sm text-gray-500">Recently added trips you can book now</p>
        <LatestTicketsSection />
      </section>

      <section className="page-bg mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
        <h2 className="mb-2 text-center text-3xl font-black bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
          Advertisement
        </h2>
        <p className="mb-8 text-center text-sm text-gray-500">Featured tickets selected by admin</p>
        <AdvertisementSection />
      </section>

      <TrendingDestinations />
      <WhyChooseUs />
      <EasySteps />
      <TravelersSay />
    </>
  );
}
