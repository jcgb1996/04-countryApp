import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  standalone: false,

  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit {
    public countries: Country[] = [];
    public isLoadin: boolean = false;
    public initialValue: string = '';

    constructor(private countriesService: CountriesService){}

    ngOnInit(): void {
      this.countries = this.countriesService.cacheStore.byCapital.countrie;
      this.initialValue = this.countriesService.cacheStore.byCapital.term;
    }


    searchByCapital(term : string): void{
      this.isLoadin = true;
      this.countriesService.searchCapital(term).subscribe( countries =>
        {
          this.countries = countries;
          this.isLoadin = false;
        });
    }
}
