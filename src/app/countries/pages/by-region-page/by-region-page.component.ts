import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  standalone: false,

  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent implements OnInit {

  public region: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectRegion?: Region;

  constructor( private countriesService: CountriesService  ){}

  ngOnInit(): void {
    this.region =  this.countriesService.cacheStore.byRegion.countrie;
    this.selectRegion =  this.countriesService.cacheStore.byRegion.region;
  }


  searchRegion(region: Region): void{
    this.selectRegion = region;
    this.countriesService.searchRegion(region)
    .subscribe( country=> {
      this.region = country;
    } );
    ;
  }
}
