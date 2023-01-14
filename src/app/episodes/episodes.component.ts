import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEpisode } from '../interfaces';
import { EpisodesService } from '../services/episodes.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {
  Episodes: IEpisode[] = [];
  allEpisodes: number = 0;
  pagination: number = 1;

  constructor(
    private episodeService: EpisodesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.forEach((params: any) => {
      this.pagination = Number(params['page']) ?? 1;
    });

    this.fetchEpisodes();
  }

  fetchEpisodes(): void {
    this.episodeService.getEpisodes(this.pagination).subscribe((res: any) => {
      this.Episodes = res.results;
      this.allEpisodes = res.info.count;
    })
  }

  renderPage(event: number) {
    this.pagination = event;
    this.fetchEpisodes();

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { page: event },
        queryParamsHandling: 'merge'
      }
    );
  }
}
