import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError,  map,  Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) { }


  private get(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(() => of([]))
    );

  }

  searchCapital(term:string): Observable<Country[]>{
    const url: string = `${this.apiUrl}/capital/${term}`;
    return this.get(url);

  }

  searchCountry(country: string): Observable<Country[]>{
    const url: string = `${this.apiUrl}/name/${country}`;
    return this.get(url);
  }

  searchRegion(region: string):  Observable<Country[]>{
    const url: string = `${this.apiUrl}/region/${region}`;
    return this.get(url);

  }

  searchCountryByAlphaCode(code:string):  Observable<Country | null>{
    const url: string = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
    .pipe(
        map( (countries : Country[]) => countries.length > 0 ? countries[0] : null  ),
        catchError(() => of(null))
    );
  }

}
