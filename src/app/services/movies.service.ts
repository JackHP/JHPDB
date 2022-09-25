import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieActor, MovieChart, MovieCredits, MovieDto, MovieImages, MovieVideoDto } from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GenresDto } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseurl: string = 'https://api.themoviedb.org/3';
  api_key: string = '8192a5519ac9344d736e2642f0401a4d';
  constructor(private http: HttpClient) { }

  getMovie(id: string) {
    return this.http.get<Movie>(`${this.baseurl}/movie/${id}?api_key=${this.api_key}`);
  }

  getMovieImages(id: string) {
    return this.http.get<MovieImages>(`${this.baseurl}/movie/${id}/images?api_key=${this.api_key}`);
  }
  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(`${this.baseurl}/movie/${id}/credits?api_key=${this.api_key}`);
  }
  getMovieActor(id: string) {
    return this.http.get<MovieActor>(`${this.baseurl}/person/${id}?api_key=${this.api_key}`);
  }
  getMovieYear(year: string) {
    return this.http.get<MovieChart>(`${this.baseurl}/discover/movie?primary_release_year=${year}&api_key=${this.api_key}`);
  }

  getMovies(type: string = 'upcoming', count: number = 12) {
    return this.http.get<MovieDto>(`${this.baseurl}/movie/${type}?api_key=${this.api_key}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getMoviesByGenre(genreId: string, page: number) {
    return this.http.get<MovieDto>(`${this.baseurl}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${this.api_key}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  getMovieVideos(id: string) {
    return this.http.get<MovieVideoDto>(`${this.baseurl}/movie/${id}/videos?api_key=${this.api_key}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  getMoviesGenres() {
    return this.http.get<GenresDto>(`${this.baseurl}/genre/movie/list?api_key=${this.api_key}`).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }

  getMovieimages(id: string) {
    return this.http.get<MovieVideoDto>(`${this.baseurl}/movie/${id}/images?api_key=${this.api_key}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  searchMovies(page: number, searchValue?: string) {
    const q_url = searchValue ? '/search/movie' : '/movie/popular';
    return this.http.get<MovieDto>(`${this.baseurl}${q_url}?page=${page}&query=${searchValue}&api_key=${this.api_key}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }
}
