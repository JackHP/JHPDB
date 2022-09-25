import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieActor, MovieCredits, MovieImages, MovieVideo } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { first, take } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { RESPONSIVE_OPTIONS } from '../../constants/responsive-options';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  actorList: MovieActor[] = [];
  responsiveOptions = RESPONSIVE_OPTIONS;
  imagesSizes = IMAGES_SIZES;
  requests: Observable<MovieActor>[] = [];
  

  constructor(private route: ActivatedRoute, private movieService: MoviesService) { }

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovieCredits(id);
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
    })
  }

  ngOnDestroy(): void {
  }

  getMovie(id: string) {
    this.movieService.getMovie(id).subscribe(movieData => {
      this.movie = movieData;
    })
  }

  getMovieVideos(id: string) {
    this.movieService.getMovieVideos(id).subscribe(movieVideosData => {
      this.movieVideos = movieVideosData;
    })
  }

  getMovieImages(id: string) {
    this.movieService.getMovieImages(id).subscribe(movieImagesData => {
      this.movieImages = movieImagesData;
    })
  }

  getMovieCredits(id: string) {
    this.movieService.getMovieCredits(id).subscribe(movieCreditsData => {
      this.movieCredits = movieCreditsData;
      if (this.movieCredits) {
        // this.movieCredits.cast.forEach(actor => {
        //   this.getMovieActor(actor.id);
        // });
        this.movieCredits.cast.forEach(actor => {
          const request = this.movieService.getMovieActor(actor.id);
          this.requests.push(request);
        });
        forkJoin(this.requests).subscribe(res => {
          res.forEach(movieActorData => this.actorList.push(movieActorData));
        })
      }
    })
  }

  // getMovieActor(id: string) {
  //   this.movieService.getMovieActor(id).subscribe(movieActorData => {
  //     this.actorList.push(movieActorData);
  //   })
  // }
}