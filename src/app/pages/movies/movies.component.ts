import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  genreId: string | null = null;
  genre: string | null = null;
  movies: Movie[] = [];
  searchValue: string | null = null;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMovieByGenre(genreId, 1);
      }
      else {
        this.getPagedMovies(1);
      }
    });
    this.route.queryParams.pipe(first()).subscribe(params => {
      if (params['genre']) {
        this.genre = params['genre'];
      }
    });
  }

  getMovieByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies;
    });
  }

  getPagedMovies(page: number, searchKeyword?: string) {
    this.moviesService.searchMovies(page, searchKeyword).subscribe((movies) => {
      this.movies = movies;
    });
  }

  paginate(event: any) {
    if (this.genreId) {
      this.getMovieByGenre(this.genreId, event.page + 1)
    }
    else {
      if (this.searchValue) {
        this.getPagedMovies(event.page + 1, this.searchValue);
      }
      else {
        this.getPagedMovies(event.page + 1);
      }
    }
  }

  searchChanged() {
    if (this.searchValue) {
      if (this.genreId) {
        this.genre = "";
      }
      this.getPagedMovies(1, this.searchValue)
    }
  }
}
