import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private url: string = 'https://rickandmortyapi.com/api/location';

  constructor(private httpClient: HttpClient) { }

  getLocations(page: number) {
    return this.httpClient.get(this.url + '?page=' + page);
  }
}
