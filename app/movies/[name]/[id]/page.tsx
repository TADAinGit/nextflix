"use client";
import { originalImage } from "@/configs/tmdb/image-path";
import tmdbApi, { TmdbMediaType } from "@/configs/tmdb/tmdb-api";
import { Cast, Crew } from "@/types/cast";
import { DetailMovie, DetailTV, Movie, TV, TrendingVideo } from "@/types/movie";
import { VideoResult } from "@/types/video";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
          className={`movies-detail bg-no-repeat bg-cover relative bg-center
          pt-24 pb-4 before:content-[""] before:absolute before:left-0 before:bottom-0 before:w-full before:h-full
          before:bg-gradient-to-t before:from-black-2  before:to-black-2/70
          `}
          style={{
            backgroundImage: `url(${originalImage(data.data.backdrop_path)})`,
          }}
        >
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
        </div>
      )}
    </main>
  );
};

export default MovieDetails;
