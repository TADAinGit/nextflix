"use client";
import tmdbApi from "@/configs/tmdb/tmdb-api";
import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import ReviewContent from "./ReviewContent";

type Props = {
  "movie-id": number;
  "media-type": "movie" | "tv";
};

const ReviewList = (props: Props) => {
  const { data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      tmdbApi.getReview(props["media-type"], props["movie-id"], {
        page: 1,
      }),
    enabled: props["movie-id"] !== undefined,
  });

  useEffect(() => {
    if (data) {
      console.log(data.data);
    }
  }, [data]);

  return (
    <section className="pb-10 px-10">
      <div className="group inline-flex items-center gap-x-3 mb-5">
        <h2
          className={`font-semibold text-white/80 py-1 text-2xl relative 
        after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40`}
        >
          Reviews{" "}
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {data &&
          data.data.results.map((review: any, _: any) => (
            <div key={review.id}>
              <ReviewContent
                author={review["author"]}
                created_at={review["created_at"]}
                content={review["content"].replace(/(?:\r\n|\r|\n)/g, "<br/>")}
              />
            </div>
          ))}

        {data?.data.results.length === 0 && (
          <div className="text-gray-300 font-semibold text-lg">
            This movie hasn&apos;t been reviewed by anyone yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewList;
