import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private titleService: Title) {
    titleService.setTitle("JHPDB");
   }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Movies',
        routerLink: ['/movies']
      },
      {
        label: 'TV Shows',
        routerLink: "/tv-shows"
      },
      {
        label: 'Genres',
        routerLink: "/genres"
      },
      // {
      //   label: 'Data Analysis',
      //   routerLink: "/data-analysis",
      // }
    ];
  }
}
