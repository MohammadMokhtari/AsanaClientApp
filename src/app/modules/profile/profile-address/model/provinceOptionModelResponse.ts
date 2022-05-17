import { CityModel } from './city.model';
import { ProvinceModel } from './province.model';
export interface ProvinceOptionModelResponse {
  provinces: ProvinceModel[];
  cities: CityModel[];
}
