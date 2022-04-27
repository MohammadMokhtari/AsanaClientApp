import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, shareReplay } from 'rxjs/operators';

import { ResponseJsonStatus } from '@shared-module/models/ResponseJsonStatus';
import { ProvinceOptionModelResponse } from '../model/provinceOptionModelResponse';
import { Option } from '@shared-module/forms/select/selectOption';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  constructor(private http: HttpClient) {}

  public provincesOptions: Option[];
  public citiesOptions: Option[];

  private provinceObs: Observable<
    ResponseJsonStatus<ProvinceOptionModelResponse>
  >;

  fetchProvinces() {
    if (!this.provinceObs) {
      this.provinceObs = this.http
        .get<ResponseJsonStatus<ProvinceOptionModelResponse>>('address/create')
        .pipe(
          shareReplay(1),
          tap((data) => {
            this.provincesOptions = data.data.provinces.map((province) => {
              return new Option(province.name, province.name, false);
            });
            this.citiesOptions = data.data.cities.map((city) => {
              return new Option(city.name, city.name, false, city.provinceName);
            });
          })
        );
    }
    return this.provinceObs;
  }

  getProvinceOption() {
    return this.provincesOptions?.slice();
  }
  getCitieOption() {
    return this.citiesOptions?.slice();
  }
}
