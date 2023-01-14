import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ICharacter } from '../interfaces';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  Characters: ICharacter[] = [];
  allCharacters: number = 0;
  pagination: number = 1;

  constructor(
    private characterService: CharactersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(): void {
    this.characterService.getCharacters(this.pagination).subscribe((res: any) => {
      this.Characters = res.results;
      this.allCharacters = res.info.count;
    })
  }

  renderPage(event: number) {
    this.pagination = event;
    this.fetchCharacters();

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
