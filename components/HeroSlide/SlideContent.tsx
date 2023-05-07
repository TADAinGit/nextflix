"use client";
import { originalImage } from "@/configs/tmdb/image-path";
import { TmdbMediaType } from "@/configs/tmdb/tmdb-api";
import { urlMap } from "@/types/common";
import { Genre } from "@/types/genre";
import { RiMovie2Fill } from "react-icons/ri";
import { MdLiveTv } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import { TrendingVideo } from "@/types/movie";
import Link from "next/link";
import { memo } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface SliceProps {
  movie: TrendingVideo;
  onClickTrailer?: (mediaType: TmdbMediaType, id: number) => void;
  genres: Genre[] | undefined;
}

const SlideContent = memo(({ movie, onClickTrailer, genres }: SliceProps) => {
  return (
    <div
      className={`md:h-[48rem] h-[20rem] bg-no-repeat bg-cover relative bg-center  
      before:content-[''] before:absolute before:w-full 
      before:h-full before:top-0 before:left-0 before:z-[2]
      before:bg-gradient-to-t from-black via-black/20 to-black/80`}
      style={{ backgroundImage: `url(${originalImage(movie.backdrop_path)})` }}
    >
      <div className="h-full relative z-10">
        <div className="absolute bottom-12 left-6 w-full md:w-[65%] md:left-4 lg:left-8 pr-6">
          <Link
            href={`${urlMap[movie.media_type]}/${
              encodeURIComponent(
                (movie.name || movie.title).toLowerCase()
              ).replace(/%20/g, "-") || "na"
            }/${movie.id}`}
            className="movie-name duration-300 transition-colors hover:text-dark-teal text-3xl md:text-4xl text-white font-bold drop-shadow-lg pr-6"
          >
            {movie.name || movie.title}
          </Link>
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 mt-2">
            <span className="rating flex gap-x-2 items-center text-white text-lg w-8 h-8">
              <CircularProgressbar
                value={Number(movie.vote_average * 10)}
                text={`${Number(movie.vote_average).toFixed(1)}`}
                background
                backgroundPadding={5}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "red",
                  trailColor: "white",
                  textSize: "34px",
                  backgroundColor: "transparent",
                })}
                strokeWidth={10}
              />
            </span>
            <div className="cate">
              {genres?.map((item) => {
                return (
                  <a
                    href="#"
                    key={item.id.toString()}
                    className="cates inline-block mr-3 text-xs text-white/70 hover:text-white transition-colors duration-300 ease-out"
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="movie-desc hidden  sm:block mt-4 text-white/60 font-normal text-base">
            {movie.overview}
          </div>
          <div className="buttons mt-8 flex gap-6">
            <Link
              href={`${urlMap[movie.media_type]}/${
                encodeURIComponent(
                  (movie.name || movie.title).toLowerCase()
                ).replace(/%20/g, "-") || "na"
              }/${movie.id}`}
              className="watch-btn banner-btn font-semibold border-red-600 text-red-600 hover:bg-red-600 hover:text-white "
            >
              <BsFillPlayFill size={20} /> Watch now
            </Link>
            <button
              onClick={() =>
                onClickTrailer && onClickTrailer(movie.media_type, movie.id)
              }
              className="add-btn banner-btn font-semibold  border-white/50 text-white/50 hover:bg-white hover:text-black"
            >
              <BiMoviePlay size={16} /> Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

SlideContent.displayName = "SlideContent";

export default SlideContent;
