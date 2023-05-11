import React from "react";
import Link from "next/link";

interface IProps {
  size?: "small" | "medium" | "large" | "maximum";
  allowNavigate?: boolean;
}

const Logo = ({ size = "medium", allowNavigate = true }: IProps) => {
  const sizeMap = {
    small: "text-xl",
    medium: "text-3xl",
    large: "text-5xl",
    maximum: "text-6xl",
  };
  return (
    <Link
      href="/"
      className={`logo ${sizeMap[size]} font-bold text-white ${
        !allowNavigate && "pointer-events-none"
      }`}
    >
      <span className="">NEXT</span>
      <span className="text-red-600">Flix</span>
    </Link>
  );
};

export default Logo;
