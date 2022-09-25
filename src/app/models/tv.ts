import { Movie } from './movie';

export interface Tv extends Movie {
  name: string;
  first_air_date: string;
  homepage: string;
  number_of_seasons: string;
  number_of_episodes: string;
  last_episode_to_air: {
    air_date: string;
  }
}

export interface TvDto {
  page: number;
  results: Tv[];
  total_results: number;
  total_pages: number;
}

export interface TvVideoDto {
  id: number;
  results: TvVideo[];
}

export interface TvVideo {
  site: string;
  key: string;
}

export interface TvImages {
  backdrops: {
    file_path: string;
  }[]
}

export interface TvCredits {
  cast: {
    id: string;
    name: string;
    character: string;
    profile_path: string;
    imdb_id?: string;
  }[]
}

export interface TvActor {
  imdb_id: string;
}
