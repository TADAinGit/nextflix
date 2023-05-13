import tmdbApi from "@/configs/tmdb/tmdb-api";
import { Movie } from "@/types/movie";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ListHorizontal from "./ListHorizontal";

type Props = {
  "movie-id": number;
  "media-type": "movie" | "tv";
};

const HorizontalRecommendMovies = (props: Props) => {
  const recommendQuery = useQuery({
    queryKey: ["recommend-movies"],
    queryFn: () =>
      tmdbApi.getRecommendations<Movie>(
        props["media-type"],
        props["movie-id"],
        {
          page: 1,
        }
      ),
    enabled: props["movie-id"] !== undefined,
  });

  return (
    <section className="pb-10 px-10">
      <div className="group inline-flex items-center gap-x-3">
        <h2
          className={`font-semibold text-white/80 py-1 text-2xl relative 
            after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40`}
        >
          Recommendations{" "}
        </h2>
        <Link href={"/tv-series"}>
          <h2 className="opacity-0 group-hover:opacity-100 text-red-500 font-semibold text-xs cursor-pointer duration-300 hover:underline">
            See more &gt;
          </h2>
        </Link>
      </div>
      {recommendQuery.data && (
        <ListHorizontal
          mediaType={props["media-type"]}
          className="pb-8 pt-6"
          data={recommendQuery.data?.data.results.slice(0, 10)}
        />
      )}
      {recommendQuery.isInitialLoading && (
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

export default HorizontalRecommendMovies;
