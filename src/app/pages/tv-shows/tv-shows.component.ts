import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, take } from 'rxjs/operators';
import { TvShowsService } from '../../services/tv-shows.service';
import { Tv } from '../../models/tv';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {
  genreId: string | null = null;
  genre: string | null = null;
  tv_shows: Tv[] = [];
  searchValue: string | null = null;

  constructor(private route: ActivatedRoute, private tvShowService: TvShowsService) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getTvShowByGenre(genreId, 1);
      }
      else {
        this.getPagedTvShows(1);
      }
    });
    this.route.queryParams.pipe(first()).subscribe(params => {
      if (params['tv_genre']) {
        this.genre = params['tv_genre'];
      }
    });
  }

  getTvShowByGenre(genreId: string, page: number) {
    this.tvShowService.getTvShowByGenre(genreId, page).subscribe((tv_shows) => {
      this.tv_shows = tv_shows;
    });
  }

  getPagedTvShows(page: number, searchKeyword?: string) {
    this.tvShowService.searchTvShows(page, searchKeyword).subscribe((tv_shows) => {
      this.tv_shows = tv_shows;
    });
  }

  paginate(event: any) {
    if (this.genreId) {
      this.getTvShowByGenre(this.genreId, event.page + 1)
    }
    else {
      if (this.searchValue) {
        this.getPagedTvShows(event.page + 1, this.searchValue);
      }
      else {
        this.getPagedTvShows(event.page + 1);
      }
    }
  }

  searchChanged() {
    if (this.searchValue) {
      if (this.genreId) {
        this.genre = "";
      }
      this.getPagedTvShows(1, this.searchValue)
    }
  }

}
