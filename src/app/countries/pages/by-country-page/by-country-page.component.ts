import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  standalone: false,

  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent implements OnInit {

  public country: Country[] = [];
  public initialValue: string = '';
  constructor( private countriesService: CountriesService  ){}

  ngOnInit(): void {
    this.country = this.countriesService.cacheStore.byCountrie.countrie;
    this.initialValue = this.countriesService.cacheStore.byCountrie.term;
  }


  searchByCountry(country: string): void{
    this.countriesService.searchCountry(country)
    .subscribe( country=> {
      this.country = country;
    } );
    ;
  }
}
