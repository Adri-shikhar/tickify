// Landing page (route: /)
import BackgroundSwiper from "@/Components/BackgroundSwiper";
import LatestTicker from "@/Components/LatestTicker";

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
    </>
  );
}
