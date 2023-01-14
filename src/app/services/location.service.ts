import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private url: string = 'https://rickandmortyapi.com/api/location';

  constructor(private httpClient: HttpClient) { }

  getLocation(id: string) {
    return this.httpClient.get(this.url + '/' + id);
  }

  getResidents(resident: string) {
    return this.httpClient.get(resident);
  }
}
