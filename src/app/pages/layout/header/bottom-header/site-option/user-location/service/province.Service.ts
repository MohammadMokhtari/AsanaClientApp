import { ProvinceOptionModelResponse } from './../../../../../../../modules/account/account-address/model/provinceOptionModelResponse';
import { ResponseJsonStatus } from '@shared-module/models/ResponseJsonStatus';
import { tap } from 'rxjs/operators';
import { Option } from '@shared-module/forms/select/selectOption';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  constructor(private http: HttpClient) {}

  public provincesOptions: Option[];
  public citiesOptions: Option[];

  fetchProvinces(): Observable<
    ResponseJsonStatus<ProvinceOptionModelResponse>
  > {
    return this.http
      .get<ResponseJsonStatus<ProvinceOptionModelResponse>>(
        'address/allProvince'
      )
      .pipe(
        tap((data) => {
          this.provincesOptions = data.data.provinceOptions.map((option) => {
            return new Option(option.lable, option.value, option.isActive);
          });
          this.citiesOptions = data.data.cityOptions.map((option) => {
            return new Option(
              option.lable,
              option.value,
              option.isActive,
              option.parentId
            );
          });
        })
      );
  }

  getProvinceOption() {
    return this.provincesOptions?.slice();
  }
  getCitieOption() {
    return this.citiesOptions?.slice();
  }
}
