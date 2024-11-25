import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError,  delay,  map,  Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-strore.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore : CacheStore = {
    byCapital:{ term: '', countrie: [] },
    byCountrie:{ term: '', countrie: [] },
    byRegion:{ region: '', countrie: [] },
  }


  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }


  private CountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(() => of([])),
    );

  }

  searchCapital(term:string): Observable<Country[]>{
    const url: string = `${this.apiUrl}/capital/${term}`;
    return this.CountriesRequest(url)
    .pipe(
      tap(countrie => { this.cacheStore.byCapital = {  term: term, countrie: countrie   } } ),
      tap(() => this.saveToLocalStorage())
    );

  }

  searchCountry(country: string): Observable<Country[]>{
    const url: string = `${this.apiUrl}/name/${country}`;
    return this.CountriesRequest(url)
    .pipe(
      tap(c => { this.cacheStore.byCountrie = {  term: country, countrie: c   } }  ),
      tap(() => this.saveToLocalStorage())
    )
    ;
  }

  searchRegion(region: Region):  Observable<Country[]>{
    const url: string = `${this.apiUrl}/region/${region}`;
    return this.CountriesRequest(url)
    .pipe(
      tap(r => { this.cacheStore.byRegion = {  region: region, countrie: r   } }),
      tap(() => this.saveToLocalStorage())
    )
    ;
  }

  searchCountryByAlphaCode(code:string):  Observable<Country | null>{
    const url: string = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
    .pipe(
        map( (countries : Country[]) => countries.length > 0 ? countries[0] : null  ),
        catchError(() => of(null))
    );
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify( this.cacheStore )  );
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

}
