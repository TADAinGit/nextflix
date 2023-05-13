"use client";
import dateFormatter from "@/utils/dateFormatter";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";

type Props = {
  content: string;
  author: string;
  created_at: Date;
};

const ReviewContent = (props: Props) => {
  const contentLength = 400;
  const [contentExpand, setContentExpand] = useState<boolean>(false);

  const toggleContentExpand = () => {
    setContentExpand(!contentExpand);
  };
  return (
    <div className="border-2 border-red-500/40 rounded-md py-3 px-6">
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <Image
            src="/img/user-placeholder.png"
            alt="user-avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full bg-white cursor-pointer"
          />
          <div className="flex flex-col group cursor-pointer">
            <span className="text-lg text-gray-200 font-bold group-hover:text-red-500">
              {props.author}
            </span>
            <span className="text-xs text-gray-300">
              {dateFormatter(props.created_at)}
            </span>
          </div>
        </div>

        <div className="text-gray-300 md:text-lg text-sm tracking-tight text-justify">
          {ReactHtmlParser(
            props.content.length < contentLength || contentExpand
              ? props.content
              : `${props.content.substring(0, contentLength)}...`
          )}
          <span
            onClick={toggleContentExpand}
            className="cursor-pointer font-semibold text-xs text-red-500 duration-200"
          >
            {" "}
            {props.content.length < contentLength
              ? ""
              : contentExpand
              ? "(short)"
              : "more"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewContent;
