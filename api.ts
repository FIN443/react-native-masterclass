const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_URL = "https://api.themoviedb.org/3";

export interface MovieProps {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TvProps {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: MovieProps[];
}

export interface TvResponse extends BaseResponse {
  results: TvProps[];
}

export const moviesApi = {
  trending: () =>
    fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko&page=1`
    ).then((res) => res.json()),
  upcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=1&region=kr`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=kr`
    ).then((res) => res.json()),
};

export const tvApi = {
  trending: () =>
    fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=ko&page=1`
    ).then((res) => res.json()),
  airingToday: () =>
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko&page=1`
    ).then((res) => res.json()),
  topRated: () =>
    fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko&page=1`
    ).then((res) => res.json()),
};
