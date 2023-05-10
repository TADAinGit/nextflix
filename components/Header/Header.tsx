"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Logo from "../AppLogo/AppLogo";
import { CgMenuRight } from "react-icons/cg";
import { RxAvatar } from "react-icons/rx";
import SearchBar from "../SearchBar/SearchBar";
type Props = {};

const urlMap = [
  {
    ref: "/",
    name: "Home",
  },
  {
    ref: "/movies",
    name: "Movies",
  },
  {
    ref: "/tv-series",
    name: "TV Series",
  },
];

const Header = (props: Props) => {
  const path = usePathname();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [headerColor, setHeaderColor] = useState(
    "bg-gradient-to-t from-black/5 to-black/100"
  );

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero-slide");
      // console.log({
      //   hero: hero?.offsetHeight,
      //   topScreen: document.documentElement.scrollTop,
      //   screen: {
      //     height: window.innerHeight,
      //     width: window.innerWidth,
      //   },
      // });

      setHeaderColor(
        document.documentElement.scrollTop + 100 <=
          (hero as HTMLElement)?.offsetHeight || 500
          ? "bg-gradient-to-t from-black/5 to-black/100"
          : /*"bg-gradient-to-t from-black/5 from-20% via-black/60 via-50% to-black/100"*/ "bg-black"
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuRef]);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header
      className={`fixed flex items-center gap-x-10 px-5 md:py-0 py-3 ${headerColor} w-full z-50 transition-colors duration-700 justify-between`}
    >
      <div className="flex justify-center items-center space-x-6">
        <Logo />
        <nav className="md:flex gap-x-5 py-5 hidden">
          {urlMap.map((url, i) => (
            <Link key={url.name} href={url.ref}>
              <span
                className={`${
                  url.ref === path ? "text-red-500" : "text-white"
                } text-lg font-semibold hover:text-red-500 whitespace-nowrap`}
              >
                {url.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-2 w-[40rem] justify-end">
        <CgMenuRight
          color="white"
          size={28}
          className="md:hidden duration-200 cursor-pointer hover:scale-110"
        />
        <SearchBar />
        <div ref={menuRef} className="group block">
          <button
            className="hidden md:block cursor-pointer"
            onClick={() => handleOpenMenu()}
          >
            <RxAvatar color="white" size={36} />
          </button>
          <div
            className={`${
              openMenu ? "md:block hidden" : "hidden"
            } group-hover:md:block absolute w-[15rem] bg-[#fefefe] mt-1 right-5 rounded-md 
            after:content-[""] after:bg-[#fefefe] after:absolute after:h-3 after:w-3 after:-top-1 after:right-3 after:rotate-45 after:-z-10`}
          >
            {isLogin ? (
              <div className="user-menu flex flex-col">
                <div className="flex flex-col items-center my-2">
                  <h1 className="font-semibold text-black">Your username</h1>
                  <span className="text-xs hover:underline text-gray-500 hover:text-red-600">
                    <Link href={""}>View profile</Link>
                  </span>
                </div>
                <div className="border-b-2 border-b-gray-300" />
                <ul className="flex flex-col gap-1 py-2">
                  <Link href={""}>
                    <li className="hover:bg-red-600 hover:text-white px-3 py-1 font-medium text-gray-500">
                      My favorite
                    </li>
                  </Link>
                  <Link href={""}>
                    <li className="hover:bg-red-600 hover:text-white px-3 py-1 font-medium text-gray-500">
                      History
                    </li>
                  </Link>
                  <Link href={""}>
                    <li className="hover:bg-red-600 hover:text-white px-3 py-1 font-medium text-gray-500">
                      Following
                    </li>
                  </Link>
                  <div className="border-b-2 border-b-gray-300" />
                  <Link href={""}>
                    <li className="hover:bg-red-600 hover:text-white px-3 py-1 font-medium text-gray-500">
                      Edit profile
                    </li>
                  </Link>
                  <Link href={""}>
                    <li className="hover:bg-red-600 hover:text-white px-3 py-1 font-medium text-gray-500">
                      Settings
                    </li>
                  </Link>
                  <div className="border-b-2 border-b-gray-300" />

                  <Link
                    onClick={() => {
                      setIsLogin(false);
                    }}
                    href={""}
                  >
                    <li className="hover:bg-red-600 hover:text-white px-3 py-1 font-medium text-gray-500">
                      Logout
                    </li>
                  </Link>
                </ul>
              </div>
            ) : (
              <div className="menu flex flex-col">
                <ul className="flex flex-col gap-1 py-2">
                  <Link href={""}>
                    <li className="hover:bg-red-600 hover:text-white px-3 py-1 font-medium text-gray-500">
                      Create account
                    </li>
                  </Link>
                  <div className="border-b-2 border-b-gray-300" />

                  <Link
                    onClick={() => {
                      setIsLogin(true);
                    }}
                    href={""}
                  >
                    <li className="hover:bg-red-600 hover:text-white px-3 py-1 font-medium text-gray-500">
                      Login
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
