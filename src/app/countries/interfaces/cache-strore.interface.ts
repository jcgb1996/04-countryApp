import { Country } from "./country";
import { Region } from "./region.type";

export interface CacheStore {
  byCapital : TermCountries,
  byCountrie : TermCountries,
  byRegion : RegionCountries,
}

export interface TermCountries {
  term: string,
  countrie: Country[]
}

export interface RegionCountries{
  region: Region;
  countrie: Country[]
}
