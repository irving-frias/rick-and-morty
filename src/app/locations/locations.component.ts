import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private locationService: LocationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.forEach((params: any) => {
      this.pagination = Number(params['page']) ?? 1;
    });

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
