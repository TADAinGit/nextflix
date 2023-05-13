import { Genre } from "@/types/genre";
import { TrendingVideo } from "@/types/movie";
import { Country, Paginate } from "@/types/common";
import AxiosInstance from "../axios/instance";

export type MediaType = "movie" | "tv" | "all";
export type TmdbMediaType = "movie" | "tv";
export type QueryTime = "day" | "week";

type VideoType = "popular" | "top_rated" | "upcoming";

const tmdbApi = {
  getDiscoverList: <T>(media_type: "movie" | "tv", params?: any) => {
    const url = `discover/${media_type}`;
    return AxiosInstance.get<Paginate<T>>(url, { params: { ...params } });
  },
  getTrendingMovies: (time: QueryTime, params?: any) => {
    const url = `trending/movie/${time}`;
    return AxiosInstance.get<Paginate<TrendingVideo>>(url, { params });
  },
  getTrendingTvSeries: (time: QueryTime, params?: any) => {
    const url = `trending/tv/${time}`;
    return AxiosInstance.get<Paginate<TrendingVideo>>(url, { params });
  },
  getGenres: (media_type: MediaType) => {
    const url = `genre/${media_type}/list`;
    return AxiosInstance.get<{ genres: Genre[] }>(url);
  },
  getList: <T>(media_type: MediaType, video_type: VideoType, params?: any) => {
    const url = `${media_type}/${video_type}`;
    return AxiosInstance.get<Paginate<T>>(url, { params });
  },
  getCountries: () => {
    const url = `configuration/countries`;
    return AxiosInstance.get<Country[]>(url);
  },
  search: <T>(media_type: "movie" | "tv", query: string, params?: any) => {
    const url = `search/${media_type}`;
    return AxiosInstance.get<Paginate<T>>(url, {
      params: { query, ...params },
    });
  },
  getUpComingMovie: <T>(params?: any) => {
    const url = `movie/upcoming`;
    return AxiosInstance.get<Paginate<T>>(url, { params });
  },
  getDetail: <T>(media_type: TmdbMediaType, id: number) => {
    const url = `${media_type}/${id}`;
    return AxiosInstance.get<T>(url);
  },
  getCast: <T>(media_type: TmdbMediaType, id: number) => {
    const url = `${media_type}/${id}/credits`;
    return AxiosInstance.get<T>(url);
  },
  getRecommendations: <T>(
    media_type: TmdbMediaType,
    id: number,
    params?: any
  ) => {
    const url = `${media_type}/${id}/recommendations`;
    return AxiosInstance.get<Paginate<T>>(url, { params });
  },
  getVideo: <T>(media_type?: TmdbMediaType, id?: number) => {
    const url = `${media_type}/${id}/videos`;
    return AxiosInstance.get<T>(url);
  },
  getReview: (media_type: TmdbMediaType, id: number, params?: any) => {
    const url = `${media_type}/${id}/reviews`;
    return AxiosInstance.get(url, { params });
  },
};

export default tmdbApi;
