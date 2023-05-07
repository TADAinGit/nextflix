"use client";
import { originalImage } from "@/configs/tmdb/image-path";
import tmdbApi, { TmdbMediaType } from "@/configs/tmdb/tmdb-api";
import { Cast, Crew } from "@/types/cast";
import { DetailMovie, DetailTV, Movie, TV, TrendingVideo } from "@/types/movie";
import { VideoResult } from "@/types/video";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useQuery } from "react-query";

type Props = {
  mediaType: TmdbMediaType;
};

const MovieDetails = ({ mediaType = "tv" }: Props) => {
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
  return (
    <main className="min-h-screen">
      {data && (
        <div
          className="detail"
          style={{
            backgroundImage: `url(${originalImage(data.data.backdrop_path)})`,
          }}
        ></div>
      )}
    </main>
  );
};

export default MovieDetails;
