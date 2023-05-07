import React from "react";
import Skeleton from "react-loading-skeleton";

type Props = {};

const SkeletonHeroSlice = (props: Props) => {
  return (
    <Skeleton
      baseColor="#202020"
      highlightColor="#444"
      className={`md:h-[36rem] bg-no-repeat bg-cover relative bg-center sm:h-[33rem] 
      before:content-[''] before:absolute before:w-full 
      before:h-full before:top-0 before:left-0 before:z-[2]
      before:bg-gradient-to-t from-black-2 via-black-2/20 to-black/80 w-screen h-[26rem] skeleton`}
    />
  );
};

export default SkeletonHeroSlice;
