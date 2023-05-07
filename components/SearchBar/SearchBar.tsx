"use client";
import { originalImage } from "@/configs/tmdb/image-path";
import tmdbApi from "@/configs/tmdb/tmdb-api";
import useDebounce from "@/hooks/useDebounce";
import { Movie, TV } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IoSearch } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { TbMoodSad } from "react-icons/tb";
import { useQuery } from "react-query";

type Props = {};

const SearchBar = (props: Props) => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [media, setMedia] = useState<"movie" | "tv">("movie");
  const searchParams = useSearchParams();

  const queryParams = useDebounce(query, 1200);

  const { data, isLoading, isError, isFetched } = useQuery(
    ["search", queryParams],
    () => tmdbApi.search(media, queryParams),
    {
      enabled: queryParams !== "",
    }
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  useEffect(() => {
    if (data) console.log(data.data.results.slice(0, 6));
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.log({ isError });
    }
  }, [isError]);

  // const { data, error, isLoading, isFetching, isFetched } = useQuery({
  //   queryKey: [`search`, media, params],
  //   queryFn: () =>
  //     tmdbApi.search<Movie | TV>(media, params.search, { page: params.page }),
  //   enabled: params.search !== "",
  // });
  return (
    <div className="hidden w-full md:flex md:flex-col items-end gap-2">
      <div
        className={`flex gap-1 items-center ${
          openSearch ? "bg-[#fefefe] w-full" : "bg-transparent w-10"
        }  px-2 py-1 rounded-full duration-500 shadow-lg z-10`}
      >
        <button
          onClick={() => {
            setOpenSearch(true);
          }}
        >
          <IoSearch color={`${openSearch ? "red" : "white"}`} size={20} />
        </button>
        <div
          className={`border-r-2 px-1 relative  ${
            openSearch ? "md:block hidden" : "hidden"
          }`}
        >
          <button
            onClick={() => {
              setMedia(media === "movie" ? "tv" : "movie");
            }}
          >
            <div className="text-xs rounded-full bg-red-600 px-3 py-1 text-white font-semibold w-16 whitespace-nowrap">
              {media === "movie" ? "Movies" : "TV"}
            </div>
            <div className="bg-white w-2 rounded-full"></div>
          </button>
        </div>
        <form className={`${openSearch ? "w-full md:block hidden" : "hidden"}`}>
          <input
            id="search-input"
            name="search-input"
            type="text"
            onChange={handleSearchChange}
            value={query}
            placeholder="Enter your keywords..."
            className={`bg-inherit border-none w-full outline-none duration-500`}
          />
        </form>

        <button
          onClick={() => {
            if (query) {
              setQuery("");
            } else {
              setOpenSearch(false);
            }
          }}
        >
          <MdClear
            color="#999999"
            size={20}
            className={`${openSearch ? "md:block hidden" : "hidden"}`}
          />
        </button>
      </div>
      <div
        className={` md:relative w-full duration-500 ${
          openSearch ? "md:block hidden" : "hidden"
        }`}
      >
        <div className="absolute top-1 left-0 w-full ">
          <div
            id="search-panel"
            className={`search-panel bg-white rounded-md overflow-y-scroll max-h-[75vh] ${
              query ? "md:block" : "hidden"
            }`}
          >
            <ul className="flex flex-col py-2 gap-2 px-4 ">
              {isLoading && (
                <li className="flex px-3 text-gray-500 font-semibold font-sans gap-x-3">
                  <div
                    className="w-6 h-6 rounded-full animate-spin
                    border-2 border-dashed border-red-500 border-t-transparent"
                  />
                  Loading movies...
                </li>
              )}

              {!isFetched &&
                !isLoading &&
                (!data || data.data.results.length <= 0) && (
                  <li className="text-gray-500 hover:text-red-600 font-normal font-sans px-3">
                    Here is your result.
                  </li>
                )}

              {isFetched && (!data || data.data.results.length <= 0) && (
                <li className="text-gray-500 hover:text-red-600 font-normal font-sans flex gap-4 items-center">
                  <TbMoodSad size={20} />
                  <span>
                    Result not found for &apos;
                    <b>{queryParams}</b>
                    &apos;
                  </span>
                </li>
              )}

              {data?.data.results.slice(0, 6).map((movie: any) => (
                <Link key={movie.id} href={""}>
                  <li className="group  rounded-md border hover:shadow-md hover:scale-105 duration-200 z-[2]">
                    <div className="flex w-full">
                      <Image
                        src={
                          movie.poster_path
                            ? originalImage(movie.poster_path)
                            : "/img/placeholder.jpg"
                        }
                        alt={"Poster: " + movie.title}
                        width={80}
                        height={80}
                        className="aspect-[3/4] block object-cover rounded-l-md"
                      />

                      <div className="p-3">
                        <h2 className="group-hover:text-red-600 font-semibold text-gray-600">
                          {movie.title || movie.original_title || movie.name}
                        </h2>
                        {movie.release_date && (
                          <h4 className="text-sm font-normal text-gray-500">
                            Release date: {movie.release_date}
                          </h4>
                        )}
                        {movie.first_air_date && (
                          <h4 className="text-sm font-normal text-gray-500">
                            First-air date: {movie.first_air_date}
                          </h4>
                        )}
                      </div>
                    </div>
                  </li>
                </Link>
              ))}

              {/* <Link href={""}>
                <li className="text-gray-500 hover:text-red-600 font-normal font-sans px-3">
                  Your result here
                </li>
              </Link> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
