import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Movie, MovieActor, MovieCredits, MovieDto, MovieImages, MovieVideoDto } from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Tv, TvActor, TvCredits, TvDto, TvImages, TvVideoDto } from '../models/tv';
import { GenresDto } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {
  baseurl: string = 'https://api.themoviedb.org/3';
  api_key: string = '8192a5519ac9344d736e2642f0401a4d';
  constructor(private http: HttpClient) { }

  getTvShow(id: string) {
    return this.http.get<Tv>(`${this.baseurl}/tv/${id}?api_key=${this.api_key}`);
  }

  getTvShowVideos(id: string) {
    return this.http.get<TvVideoDto>(`${this.baseurl}/tv/${id}/videos?api_key=${this.api_key}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  getTvShowImages(id: string) {
    return this.http.get<TvImages>(`${this.baseurl}/tv/${id}/images?api_key=${this.api_key}`);
  }

  getTvShowCredits(id: string) {
    return this.http.get<TvCredits>(`${this.baseurl}/tv/${id}/credits?api_key=${this.api_key}`);
  }

  getTvShowActor(id: string) {
    return this.http.get<TvActor>(`${this.baseurl}/person/${id}?api_key=${this.api_key}`);
  }


  getTvs(type: string = 'latest', count: number = 12) {
    return this.http.get<TvDto>(`${this.baseurl}/tv/${type}?api_key=${this.api_key}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getTvShowGenres() {
    return this.http.get<GenresDto>(`${this.baseurl}/genre/tv/list?api_key=${this.api_key}`).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }

  getTvShowByGenre(genreId: string, page: number) {
    return this.http.get<TvDto>(`${this.baseurl}/discover/tv?with_genres=${genreId}&page=${page}&api_key=${this.api_key}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  searchTvShows(page: number, searchValue?: string) {
    const q_url = searchValue ? '/search/tv' : '/tv/popular';
    return this.http.get<TvDto>(`${this.baseurl}${q_url}?page=${page}&query=${searchValue}&api_key=${this.api_key}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }
}
