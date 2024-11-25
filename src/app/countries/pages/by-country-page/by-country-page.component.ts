import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  standalone: false,

  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {

  constructor( private countriesService: CountriesService  ){}

  public country: Country[] = [];

  searchByCountry(country: string): void{
    this.countriesService.searchCountry(country)
    .subscribe( country=> {
      this.country = country;
    } );
    ;
  }
}
