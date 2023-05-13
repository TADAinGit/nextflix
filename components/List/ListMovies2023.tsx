"use client";
import React from "react";
import tmdbApi, { TmdbMediaType } from "@/configs/tmdb/tmdb-api";
import ListHorizontal from "./ListHorizontal";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Movie } from "@/types/movie";
import Card from "../Card/MovieCard";
import CardSkeleton from "../Skeleton/MovieCard.skeleton";

type Props = {};

const ListMovies2023 = (props: Props) => {
  const latestMovieQuery = useQuery({
    queryKey: ["2023_movies", { page: 1 }],
    queryFn: () => tmdbApi.getDiscoverList<Movie>("movie", { year: 2023 }),
  });

  return (
    <section className="p-10">
      <div className="group flex items-center gap-x-3">
        <h2 className='text-white/80 py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>
          Movies in 2023{" "}
        </h2>
        <Link href={"/movies"}>
          <h2 className="opacity-0 group-hover:opacity-100 text-red-500 font-semibold text-xs cursor-pointer duration-300 hover:underline">
            See more &gt;
          </h2>
        </Link>
      </div>

      <div className="grid md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 lg:grid-cols-6 mt-8 lg:gap-x-3 gap-y-6 gap-x-2">
        {latestMovieQuery.data?.data.results.map((movie, _) => (
          <div key={movie.id} className="pr-4 self-stretch">
            <Card data={movie} size="normal" mediaType={"movie"} />
          </div>
        ))}
        {latestMovieQuery.isInitialLoading &&
          Array(10)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="pr-4 self-stretch">
                <CardSkeleton size="normal" />
              </div>
            ))}
      </div>
    </section>
  );
};

export default ListMovies2023;
