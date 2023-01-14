import { Component, OnInit } from '@angular/core';
import { ILocation } from '../interfaces';
import { LocationsService } from '../services/locations.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  Locations: ILocation[] = [];
  allLocations: number = 0;
  pagination: number = 1;

  constructor(private locationService: LocationsService) { }

  ngOnInit(): void {
    this.fetchLocations();
  }

  fetchLocations(): void {
    this.locationService.getLocations(this.pagination).subscribe((res: any) => {
      this.Locations = res.results;
      this.allLocations = res.info.count;
    })
  }

  renderPage(event: number) {
    this.pagination = event;
    this.fetchLocations();
  }
}
