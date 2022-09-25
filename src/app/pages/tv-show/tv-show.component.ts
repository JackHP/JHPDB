import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { first } from 'rxjs/operators';
import { TvShowsService } from '../../services/tv-shows.service';
import { RESPONSIVE_OPTIONS } from '../../constants/responsive-options';
import { Tv, TvActor, TvCredits, TvImages, TvVideo } from '../../models/tv';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss']
})
export class TvShowComponent implements OnInit {
  tv_show: Tv | null = null;
  tv_showVideos: TvVideo[] = [];
  tv_showImages: TvImages | null = null;
  tv_showCredits: TvCredits | null = null;
  actorList: TvActor[] = [];
  responsiveOptions = RESPONSIVE_OPTIONS;
  imagesSizes = IMAGES_SIZES;

  constructor(private route: ActivatedRoute, private tvShowService: TvShowsService) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getTvShowCredits(id);
      this.getTvShow(id);
      this.getTvShowVideos(id);
      this.getTvShowImages(id);
    })
  }

  ngOnDestroy(): void {
  }

  getTvShow(id: string) {
    this.tvShowService.getTvShow(id).subscribe(tvShowData => {
      this.tv_show = tvShowData;
    })
  }

  getTvShowVideos(id: string) {
    this.tvShowService.getTvShowVideos(id).subscribe(tvShowVideosData => {
      this.tv_showVideos = tvShowVideosData;
    })
  }

  getTvShowImages(id: string) {
    this.tvShowService.getTvShowImages(id).subscribe(tvShowImagesData => {
      this.tv_showImages = tvShowImagesData;
    })
  }

  getTvShowCredits(id: string) {
    this.tvShowService.getTvShowCredits(id).subscribe(tvShowCreditsData => {
      this.tv_showCredits = tvShowCreditsData;
      if (this.tv_showCredits) {
        this.tv_showCredits.cast.forEach(actor => {
          this.getTvShowActor(actor.id);
        });
      }
    })
  }

  getTvShowActor(id: string) {
    this.tvShowService.getTvShowActor(id).subscribe(tvShowActorData => {
      this.actorList.push(tvShowActorData);
    })
  }
}