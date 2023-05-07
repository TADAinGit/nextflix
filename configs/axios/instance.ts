import axios from "axios";

declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

const instance = axios.create({
  baseURL: process.env.TMDB_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    ["api_key"]: process.env.TMDB_API,
  },
});

export default instance;
