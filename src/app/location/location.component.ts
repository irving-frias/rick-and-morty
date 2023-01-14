import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICharacter, ILocation } from '../interfaces';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  ID: string = '';
  Location: ILocation | undefined;
  Residents: ICharacter[] = [];
  Resident!: ICharacter;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
  ){ }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.ID = params['id'];
      }
    );

    this.fetchLocation();
  }

  fetchLocation(): void {
    this.locationService.getLocation(this.ID).subscribe((res: any) => {
      this.Location = res;
      this.fetchResidents(this.Location?.residents!);
    });
  }

  fetchResidents(residents: string[]): any {
    residents?.map((resident) => {
      this.locationService.getResidents(resident).subscribe((res: any) => {
        this.Resident = res;
        this.Residents.push(this.Resident);
      });
    });
  }
}
