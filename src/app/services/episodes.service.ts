import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {
  private url: string = 'https://rickandmortyapi.com/api/episode';

  constructor(private httpClient: HttpClient) { }

  getEpisodes(page: number) {
    return this.httpClient.get(this.url + '?page=' + page);
  }
}
