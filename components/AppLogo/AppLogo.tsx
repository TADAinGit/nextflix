import React from "react";
import Link from "next/link";

interface IProps {
  size?: "small" | "medium" | "large" | "maximum";
}

const Logo = ({ size = "medium" }: IProps) => {
  const sizeMap = {
    small: "text-xl",
    medium: "text-3xl",
    large: "text-5xl",
    maximum: "text-6xl",
  };
  return (
    <Link href="/" className={`logo ${sizeMap[size]} font-bold text-white`}>
      <span className="">NEXT</span>
      <span className="text-red-600">Flix</span>
    </Link>
  );
};

export default Logo;
