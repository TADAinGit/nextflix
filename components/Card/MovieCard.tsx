import React, { useMemo } from "react";
import { Movie, TV, TrendingVideo } from "@/types/movie";
import { originalImage } from "@/configs/tmdb/image-path";
import { AiTwotoneStar } from "react-icons/ai";
import { MediaType } from "@/configs/tmdb/tmdb-api";
import classNames from "classnames";

import { urlMap } from "@/types/common";
import Link from "next/link";
import Image from "next/image";
// import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
  data: TrendingVideo | Movie | TV;
  mediaType: MediaType;
  size?: "normal" | "large";
};

const Card = ({ data, mediaType, size = "large" }: Props) => {
  let parserData = useMemo(() => {
    let name: string;
    let media_type: MediaType;
    let date: string;

    if (mediaType === "all") {
      let parseData = data as TrendingVideo;
      name = parseData.title || parseData.name;
      date = parseData.release_date || parseData.first_air_date;
      media_type = parseData.media_type;
    } else if (mediaType === "movie") {
      let parseData = data as Movie;
      name = parseData.title;
      date = parseData.release_date;
      media_type = "movie";
    } else {
      let parseData = data as TV;
      name = parseData.name;
      date = parseData.first_air_date;
      media_type = "tv";
    }

    return {
      name,
      media_type,
      date,
    };
  }, [data, mediaType]);
  return (
    <div className="group card hover:scale-105 transition-transform duration-300 overflow-hidden rounded-xl">
      <Link
        href={`${urlMap[parserData.media_type]}/${
          encodeURIComponent(parserData.name?.toLowerCase()).replace(
            /%20/g,
            "-"
          ) || ""
        }/${data.id}`}
        className="w-full block h-full"
      >
        <div
          className={classNames(`list__card-content`, {
            "h-80": size === "normal",
            "h-[280px]": size === "large",
          })}
        >
          <Image
            src={originalImage(data.poster_path)}
            alt={data.poster_path}
            width={200}
            height={240}
            placeholder="blur"
            blurDataURL="/img/placeholder.jpg"
            className="w-full h-full block object-cover"
          />
          <div className="absolute bottom-0  py-3 left-0 w-full px-3 z-[6] text-white/80">
            <div className="text-white/80 block font-medium text-[14px] group-hover:text-red-600 transition-colors duration-300">
              {parserData.name}
            </div>
            <div className="flex items-end justify-between text-xs">
              <span>
                {parserData.date
                  ? new Date(parserData.date).getFullYear()
                  : "N/A"}
              </span>
              <span className="flex items-center ml-2 text-[10px] gap-[2px]">
                <AiTwotoneStar className="text-sm" />
                {data.vote_average.toFixed(1)}
              </span>
              {/* <span className="inline-block text-[10px] border border-light-gray px-1 py-[2px] rounded ml-auto">
                {parserData.media_type}
              </span> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
