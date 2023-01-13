import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private url: string = 'https://rickandmortyapi.com/api/character';

  constructor(private httpClient: HttpClient) {}

  getCharacters(page: number = 1) {
    return this.httpClient.get(this.url + '?page=' + page);
  }
}
