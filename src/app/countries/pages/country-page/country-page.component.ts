import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  standalone: false,

  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit {

    public country? : Country;

    constructor(
      private activatedRoute: ActivatedRoute,
       private countriesService : CountriesService,
       private router: Router
      ){}

    ngOnInit(): void {
      this.activatedRoute.params
      .pipe(
        /* para obtener ek {{id}} se esta desestructurando el Params que es de tipo  [key: string]: any;, etnonces
          del [key: string] se esta tomando el id que es lo que esta entre {{id}}
        */
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode(id) )
      )
      .subscribe( country => {
          if(!country) return this.router.navigateByUrl('');

          return this.country = country;
          //return;

      } );
    }
}
