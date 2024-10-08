import { Component, Input } from '@angular/core';
import { Tv } from '../../models/tv';
import { Movie } from '../../models/movie';


@Component({
  selector: 'items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent {
  @Input() items: Movie[] = [];
  @Input() tv_items: Tv[] = [];
  @Input() title: string = '';

}
