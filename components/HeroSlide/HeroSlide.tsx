"use client";
import tmdbApi, { TmdbMediaType } from "@/configs/tmdb/tmdb-api";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SkeletonHeroSlice from "../Skeleton/HeroSlice.skeleton";
import SlideContent from "./SlideContent";
import { Genre } from "@/types/genre";
import Image from "next/image";
import { originalImage } from "@/configs/tmdb/image-path";

import "swiper/swiper.min.css";
import "swiper/css/pagination";

type Props = {
  //   onClickTrailer?: (mediaType: TmdbMediaType, id: number) => void;
};

SwiperCore.use([Autoplay]);

const HeroSlide = ({}: Props) => {
  const trendingQuery = useQuery({
    queryKey: ["trending"],
    queryFn: () => tmdbApi.getTrendingMovies("week"),
  });

  const genresMovieQuery = useQuery({
    queryKey: ["genres_movie"],
    queryFn: () => tmdbApi.getGenres("movie"),
  });

  const genresTVQuery = useQuery({
    queryKey: ["genres_tv"],
    queryFn: () => tmdbApi.getGenres("tv"),
  });

  // useEffect(() => {
  //   console.log(trendingQuery.data?.data);
  //   trendingQuery.data?.data.results.slice(0, 6).map((movie) => {
  //     console.log(movie);
  //   });
  // }, [trendingQuery.data]);

  return (
    <div id="hero-slide">
      <Swiper
        // spaceBetween={50}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        slidesPerView={1}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {trendingQuery.isLoading && (
          <SwiperSlide>
            <SkeletonHeroSlice />
          </SwiperSlide>
        )}
        {trendingQuery?.data?.data.results.slice(0, 8).map((movie) => {
          let genres: Genre[] | undefined = [];
          if (movie.media_type === "movie") {
            genres = genresMovieQuery.data?.data.genres.filter((genre) =>
              movie.genre_ids.includes(genre.id)
            );
          } else {
            genres = genresTVQuery.data?.data.genres.filter((genre) =>
              movie.genre_ids.includes(genre.id)
            );
          }
          return (
            <SwiperSlide key={`${movie.id}-${movie.original_name}`}>
              <SlideContent
                movie={movie}
                genres={genres}
                // onClickTrailer={onClickTrailer}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeroSlide;
