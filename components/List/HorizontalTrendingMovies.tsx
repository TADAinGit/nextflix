"use client";
import React from "react";
import tmdbApi, { TmdbMediaType } from "@/configs/tmdb/tmdb-api";
import ListHorizontal from "./ListHorizontal";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type Props = {};

const HorizontalTrendingMovies = (props: Props) => {
  const trendingQuery = useQuery({
    queryKey: ["trendingMovie"],
    queryFn: () => tmdbApi.getTrendingMovies("day"),
  });

  return (
    <section className="pb-10 px-10">
      <div className="group inline-flex items-center gap-x-3">
        <h2
          className={`font-semibold text-white/80 py-1 text-2xl relative 
        after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40`}
        >
          Top trending movies{" "}
        </h2>
        <Link href={"/movies"}>
          <h2 className="opacity-0 group-hover:opacity-100 text-red-500 font-semibold text-xs cursor-pointer duration-300 hover:underline">
            See more &gt;
          </h2>
        </Link>
      </div>
      {trendingQuery.data && (
        <ListHorizontal
          mediaType="all"
          className="pb-8 pt-6"
          data={trendingQuery.data?.data.results.slice(0, 10)}
        />
      )}
      {trendingQuery.isInitialLoading && (
        <ListHorizontal
          mediaType="all"
          className="pb-8 pt-6"
          data={[]}
          skeleton
        />
      )}
    </section>
  );
};

export default HorizontalTrendingMovies;
