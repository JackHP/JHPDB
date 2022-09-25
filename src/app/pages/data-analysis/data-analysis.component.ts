import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MovieChart } from '../../models/movie';
import { CHARTING_YEARS } from '../../constants/charting-years';
import { MoviesService } from '../../services/movies.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.scss']
})
 
export class DataAnalysisComponent implements OnInit {
  @ViewChild('chart') chart: any;
  movieYears: number[] = [];
  yearsVal: any[] = [];
  data: any;
  options: any;
  requests: Observable<MovieChart>[] = [];


  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
    this.getMovieYears(CHARTING_YEARS);
    this.data = {
      labels: CHARTING_YEARS,
      datasets: [
        {
          label: 'Number of movies within the year',
          data: this.movieYears,
          borderColor: '#64B5F6'
        }
      ]
    }

    this.options = {
      plugins: {

        title: {
          display: true,
          text: 'Movies per year',
          font: { weight: 'bold', size: 16 },
          color: '#ffffff'
        },
        legend: {
          title: {
            text: "test"
          },
          position: 'bottom'
        }
      }
    };

    //Force the chart to reload to render properly
    setTimeout(() => {
      this.chart.refresh();
    }, 2500);
  }

  getMovieYears(years: string[]) {
    years.forEach(year => {
      const request = this.movieService.getMovieYear(year);
      this.requests.push(request);
    })
    //forkJoin makes sure the requests are completed in order as our chart data needs to align with the index of the year constant
    forkJoin(this.requests).subscribe(res => {
      res.forEach(yearData => this.movieYears.push(yearData.total_results));
    })
  }
}
