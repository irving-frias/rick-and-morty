import { Component, OnInit } from '@angular/core';
import { ICharater } from '../interfaces';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  Characters: ICharater[] = [];
  allCharacters: number = 0;
  pagination: number = 1;

  constructor(private characterService: CharactersService) { }

  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(): void {
    this.characterService.getCharacters(this.pagination).subscribe((res: any) => {
      this.Characters = res.results;
      console.log(this.Characters);
      this.allCharacters = res.info.count;
    })
  }

  renderPage(event: number) {
    this.pagination = event;
    this.fetchCharacters();
  }
}
