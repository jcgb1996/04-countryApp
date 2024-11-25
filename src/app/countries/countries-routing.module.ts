import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

const route: Route[] = [
  {
    path:'by-capital',
    component: ByCapitalPageComponent,
  },
  {
    path:'by-country',
    component: ByCountryPageComponent,
  },
  {
    path:'by-region',
    component: ByRegionPageComponent,
  },
  {
    path:'by/:id',
    component: CountryPageComponent,
  },
  {
    path: '**',
    redirectTo: 'by-capital'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( route )
  ],
  exports: [
    RouterModule
  ],
})
export class CountriesRoutingModule { }


