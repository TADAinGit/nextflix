import classNames from "classnames";
import React, { useRef, memo, useEffect, useState } from "react";
import { Pagination, Navigation, Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import Card from "../Card/Card";
import { Movie, TV, TrendingVideo } from "../../types/movie";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import SkeletonCard from "../Skeleton/SkeletonCard";
import { MediaType } from "@/configs/tmdb/tmdb-api";
import Card from "../Card/MovieCard";
import CardSkeleton from "../Skeleton/MovieCard.skeleton";

type Props = {
  className?: string;
  data: TrendingVideo[] | Movie[] | TV[];
  mediaType: MediaType;
  skeleton?: boolean;
};

const ListHorizontal = memo((props: Props) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef<SwiperType>();
  const [slideView, setSlideView] = useState<number>(6);

  useEffect(() => {
    const setSlideViewForScreenSize = () => {
      if (
        window.matchMedia(`(min-width: 768px) and (max-width: 1023px)`).matches
      ) {
        setSlideView(4);
      } else if (window.matchMedia(`(min-width: 1024px)`).matches) {
        setSlideView(6);
      } else {
        setSlideView(3);
      }
    };

    setSlideViewForScreenSize(); // Set initial slide view

    window.addEventListener("resize", setSlideViewForScreenSize); // Listen for resize events

    return () => {
      window.removeEventListener("resize", setSlideViewForScreenSize); // Clean up event listener on unmount
    };
  }, []);

  return (
    <Swiper
      slidesPerView={slideView}
      modules={[Navigation, Pagination]}
      pagination={{
        dynamicBullets: true,
      }}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      loop
      className={classNames(props.className)}
    >
      {props.skeleton &&
        new Array(15).fill(0).map((_, index) => {
          return (
            <SwiperSlide
              key={index.toString() + "list-horizontal"}
              className="w-44 pr-4 self-stretch"
            >
              <CardSkeleton size="normal" />
            </SwiperSlide>
          );
        })}

      {!props.skeleton &&
        props.data.map((movie, _) => {
          if (!movie.poster_path) return;
          return (
            <SwiperSlide
              className="w-44 pr-4 self-stretch"
              key={movie.id.toString()}
            >
              <Card mediaType={props.mediaType} size="normal" data={movie} />
            </SwiperSlide>
          );
        })}
      <div
        ref={navigationNextRef}
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute w-28 h-28 bg-black/30 pl-1 hover:bg-black transition duration-300 rounded-full translate-x-[65%] flex justify-start items-center cursor-pointer top-2/4 right-0 -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl"
      >
        <MdKeyboardArrowRight />
      </div>
      <div
        ref={navigationPrevRef}
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute w-28 h-28 bg-black/30 pr-1 hover:bg-black transition duration-300 rounded-full -translate-x-[65%] flex justify-end items-center cursor-pointer top-2/4 left-0 -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl"
      >
        <MdKeyboardArrowLeft />{" "}
      </div>
    </Swiper>
  );
});

ListHorizontal.displayName = "ListHorizontal";

export default ListHorizontal;
