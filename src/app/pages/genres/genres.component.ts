import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Genre } from '../../models/genre';
import { TvShowsService } from '../../services/tv-shows.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  genres: Genre[] = []
  tv_genres: Genre[] = []

  constructor(private moviesService: MoviesService, private tvShowService: TvShowsService) { }

  ngOnInit(): void {
    this.moviesService.getMoviesGenres().subscribe(genresData=>{
      this.genres=genresData;
    })
    this.tvShowService.getTvShowGenres().subscribe(genresData=>{
      this.tv_genres=genresData;
    })
  }

}
