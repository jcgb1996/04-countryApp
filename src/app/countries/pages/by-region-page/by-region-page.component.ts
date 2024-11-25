import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  standalone: false,

  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {


  constructor( private countriesService: CountriesService  ){}

  public region: Country[] = [];

  searchRegion(region: string): void{
    this.countriesService.searchRegion(region)
    .subscribe( country=> {
      this.region = country;
    } );
    ;
  }
}
