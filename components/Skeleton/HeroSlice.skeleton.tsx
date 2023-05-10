import React from "react";
import Skeleton from "react-loading-skeleton";

type Props = {};

const SkeletonHeroSlice = (props: Props) => {
  return (
    <div className="md:h-[48rem] h-[20rem] animate-pulse bg-gray-200 overflow-hidden">
      <div className="bg-gray-300 h-2/3"></div>
      <div className="flex flex-col gap-3 p-4 h-1/3 justify-between">
        <div className="h-6 bg-gray-300"></div>
        <div className="h-6 bg-gray-300"></div>
        <div className="h-6 bg-gray-300"></div>
        <div className="flex gap-2">
          <div className="h-8 aspect-square bg-gray-300 rounded-full"></div>
          <div className="h-8 aspect-square bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonHeroSlice;
