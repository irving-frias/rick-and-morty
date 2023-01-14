import { Component, OnInit } from '@angular/core';
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

  constructor(private episodeService: EpisodesService) { }

  ngOnInit(): void {
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
  }
}
