"use client";
import React from "react";
import Logo from "../AppLogo/AppLogo";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { BsInstagram, BsFacebook, BsDiscord, BsLinkedin } from "react-icons/bs";
import Image from "next/image";

type Props = {};
SwiperCore.use([Autoplay]);
const iconSize = 20;
const contactMap = [
  {
    media: "Facebook",
    url: "",
    icon: (
      <div>
        <Image
          src={"/svg/facebook.svg"}
          alt="instagram-icon"
          width={iconSize}
          height={iconSize}
          className="group-hover:block hidden"
        />
        <BsFacebook size={iconSize} className="group-hover:hidden block" />
      </div>
    ),
  },
  {
    media: "Instagram",
    url: "",
    icon: (
      <div>
        <Image
          src={"/svg/instagram.svg"}
          alt="instagram-icon"
          width={iconSize}
          height={iconSize}
          className="group-hover:block hidden"
        />
        <BsInstagram size={iconSize} className="group-hover:hidden block" />
      </div>
    ),
  },
  {
    media: "LinkedIn",
    url: "",
    icon: (
      <div>
        <Image
          src={"/svg/linkedin.svg"}
          alt="instagram-icon"
          width={iconSize}
          height={iconSize}
          className="group-hover:block hidden"
        />
        <BsLinkedin size={iconSize} className="group-hover:hidden block" />
      </div>
    ),
  },
  {
    media: "Discord",
    url: "",
    icon: <BsDiscord size={iconSize} className="group-hover:text-[#5662F6]" />,
  },
];
const Footer = (props: Props) => {
  return (
    <div className="bg-black flex flex-col items-center">
      <div className="bg-red-600 flex py-1 w-full">
        <Swiper
          slidesPerView={3}
          centeredSlides={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          speed={4000}
          loop
          modules={[Autoplay, Pagination, Navigation]}
          className="swiper-timing"
        >
          {[...Array(11)].map((_, i) => (
            <SwiperSlide key={i}>
              <div className="bg-black">
                <Logo allowNavigate={false} size="medium" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between px-14 py-8 gap-5 w-full">
        <div className="text-white">
          <Logo size="large" />
        </div>
        <div className="text-white text-center w-[25rem] px-5">
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nisi ut aliquip ex ea commodo consequat.`}
        </div>
        <div className="text-white flex flex-col gap-4 w-[12rem]">
          <h1 className="font-bold text-xl text-center cursor-default">
            Contact
          </h1>
          <div className="flex flex-col gap-y-4 justify-center self-center">
            {contactMap.map((contact, _) => (
              <div key={contact.media}>
                <Link
                  href={contact.url}
                  className="group flex justify-start items-center space-x-5"
                >
                  <span className="text-white">{contact.icon}</span>
                  <h4 className="text-gray-100 font-semibold text-lg group-hover:underline">
                    {contact.media}
                  </h4>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 py-2">
        <div className="border-b-2 border-red-500 w-[25rem]" />
        <h1 className="text-white/80">&copy;Copyright by TADA 2023.</h1>
      </div>
    </div>
  );
};

export default Footer;
