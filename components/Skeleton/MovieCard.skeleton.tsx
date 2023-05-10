import React from "react";
import classNames from "classnames";

type Props = {
  size?: "normal" | "large";
};

const CardSkeleton = ({ size = "large" }: Props) => {
  return (
    <div className="group card hover:scale-105 transition-transform duration-300 overflow-hidden rounded-xl">
      <div
        className={classNames(`list__card-content bg-gray-200`, {
          "h-80": size === "normal",
          "h-[280px]": size === "large",
        })}
      >
        <div className="w-full h-full block animate-pulse bg-gray-300 rounded-xl"></div>
        <div className="absolute bottom-0 py-3 left-0 w-full px-3 z-[6] text-white/80">
          <div className="text-white/80 block font-medium text-[18px] group-hover:text-red-600 transition-colors duration-300 animate-pulse bg-gray-300 rounded-md h-4"></div>
          <div className="flex items-end justify-between text-xs mt-2">
            <span className="bg-gray-300 animate-pulse rounded-md py-1 px-2 h-4 aspect-video"></span>
            <span className="bg-gray-300 animate-pulse rounded-md py-1 px-2 h-4 aspect-video"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
