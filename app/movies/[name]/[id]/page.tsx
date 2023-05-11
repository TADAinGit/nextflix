"use client";
import { originalImage } from "@/configs/tmdb/image-path";
import tmdbApi, { TmdbMediaType } from "@/configs/tmdb/tmdb-api";
import { Cast, Crew } from "@/types/cast";
import { DetailMovie, DetailTV, Movie, TV, TrendingVideo } from "@/types/movie";
import { VideoResult } from "@/types/video";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import { useQuery } from "react-query";

type Props = {
  mediaType: TmdbMediaType;
};

const MovieDetails = ({ mediaType = "movie" }: Props) => {
  const [trailer, setTrailer] = useState<{
    mediaType: TmdbMediaType;
    id: number;
  }>();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { id } = useParams();
  // const location = useLocation();

  const { data, status, error, isFetching, isFetched } = useQuery({
    queryKey: ["detail", mediaType, id],
    queryFn: () => tmdbApi.getDetail<DetailMovie | DetailTV>(mediaType, +id),
    enabled: id !== undefined,
  });

  const queryCast = useQuery({
    queryKey: ["cast", mediaType, id],
    queryFn: () =>
      tmdbApi.getCast<{ cast: Cast[]; crew: Crew[] }>(mediaType, +id),
    enabled: id !== undefined,
  });

  const recommendsQuery = useQuery({
    queryKey: ["recommends", mediaType, id],
    queryFn: () =>
      tmdbApi.getRecommendations<Movie | TV | TrendingVideo>(mediaType, +id),
    enabled: id !== undefined,
  });

  const queryVideos = useQuery({
    queryKey: ["video", trailer],
    queryFn: () =>
      tmdbApi.getVideo<VideoResult>(trailer?.mediaType, trailer?.id),
    enabled: trailer?.mediaType !== undefined && trailer.id !== undefined,
    keepPreviousData: false,
  });

  const handleRequestClosePopup = () => {
    setTrailer(undefined);
    setShowPopup(false);
  };

  const handleClickTrailer = (media_type: TmdbMediaType, id: number) => {
    setTrailer({ mediaType: media_type, id });
    setShowPopup(true);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <main className="min-h-screen">
      {data && (
        <div
          className={`movies-detail md:h-[40rem] h-[20rem] bg-no-repeat bg-cover relative bg-center
            md:py-12 py-4 px-5
            before:content-[''] before:absolute before:w-full 
            before:h-full before:top-0 before:left-0 before:z-[2]
            before:bg-gradient-to-t from-black to-black/50`}
          style={{
            backgroundImage: `url(${originalImage(data.data.backdrop_path)})`,
          }}
        >
          <div className="h-full relative z-[3] flex flex-col md:flex-row gap-8 md:gap-16 py-5 items-center">
            <Image
              className="rounded-xl overflow-hidden md:w-[15rem] w-[12rem]"
              src={originalImage(data.data.poster_path)}
              alt={
                (data.data as DetailMovie).title ||
                (data.data as DetailTV).name ||
                ""
              }
              placeholder="blur"
              blurDataURL="/img/placeholder.jpg"
              width={300}
              height={300}
            />

            <div className="detail-content text-white md:flex-1">
              <div className="name text-white text-4xl tracking-widest font-extrabold">
                {(data.data as DetailMovie).title || ""}
              </div>
              <div className="info flex items-center gap-2 md:gap-4 text-sm mt-4">
                <span className="tracking-widest">
                  {new Date(
                    (data.data as DetailMovie).release_date
                  ).getFullYear() || "N/A"}
                </span>
                <span className="flex items-center gap-2">
                  <BsClockHistory className="text-xl" />
                  {(data.data as DetailMovie).runtime || "N/A"}
                </span>
                <span className="flex items-center text-sm">
                  <AiFillStar className="text-xl mr-1" />{" "}
                  {data.data.vote_average.toFixed(2)}
                  <span className="text-xs font-sans italic opacity-70">
                    /10
                  </span>
                </span>
                <button
                  onClick={() => handleClickTrailer(mediaType, data.data.id)}
                  className="flex items-center gap-4 uppercase tracking-[4px] group"
                >
                  Trailer{" "}
                  <SlArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
              <div className="flex items-center gap-6 flex-wrap mt-6">
                {data.data.genres.map((genre, index) => {
                  return (
                    <span
                      key={genre.id.toString()}
                      className="genre-items text-sm border border-white rounded-3xl py-1 px-2"
                    >
                      {genre.name}
                    </span>
                  );
                })}
              </div>
              <div className="flex items-center mt-5 gap-x-8 gap-y-4 flex-wrap">
                {queryCast.data &&
                  queryCast.data?.data.cast.slice(0, 4).map((cast, index) => {
                    if (!cast.profile_path) return;
                    return (
                      <div
                        key={cast.id.toString()}
                        className="flex items-center gap-4"
                      >
                        <Image
                          className="w-10 h-10 rounded-full object-cover"
                          src={originalImage(cast.profile_path)}
                          alt={cast.name}
                          width={100}
                          height={100}
                        />
                        <span className="text-sm opacity-70 text-white">
                          {cast.name}
                        </span>
                      </div>
                    );
                  })}
              </div>
              <div className="mt-6 text-white text-xs lg:w-[80%]">
                {data.data.overview}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MovieDetails;
