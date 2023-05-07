// import Image from "next/image";
// import { useEffect } from "react";

import HeroSlide from "@/components/HeroSlide/HeroSlide";
import HorizontalTrendingMovies from "@/components/List/HorizontalTrendingMovies";
import HorizontalTrendingTvSeries from "@/components/List/HorizontalTrendingTvSeries";
import HorizontalUpcomingMovie from "@/components/List/HorizontalUpcomingMovie";
import ListMovies2023 from "@/components/List/ListMovies2023";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col p-y-10">
      <HeroSlide />
      {/* <div className="bg-red-500 h-[26rem]"></div> */}
      <HorizontalTrendingMovies />

      <HorizontalTrendingTvSeries />

      <HorizontalUpcomingMovie />

      <ListMovies2023 />
    </main>
  );
}
