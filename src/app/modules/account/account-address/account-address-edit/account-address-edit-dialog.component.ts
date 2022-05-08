import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import {
  AddressCreatedModel,
  AddressUpdateModel,
} from './../model/addressCreateModel';
import { AppState } from 'src/app/store/app.reducer';
import { Address } from '../model/address.model';
import { Option } from '@shared-module/forms/select/selectOption';
import { ProvinceService } from 'src/app/modules/account/account-address/services/province.Service';
import * as fromAddressAction from '../store/address.action';
import * as fromAddressSelector from '../store/address.selector';

@Component({
  selector: 'app-account-address-edit',
  templateUrl: './account-address-edit-dialog.component.html',
  styleUrls: ['./account-address-edit-dialog.component.scss'],
})
export class AccountAddressEditDialogComponent implements OnInit {
  constructor(
    private provinceService: ProvinceService,
    private readonly store: Store<AppState>,
    public dialog: MatDialogRef<AccountAddressEditDialogComponent>
  ) {}

  private address: Address;

  public addressForm: FormGroup;
  public isEditMode: boolean = false;

  public provinceOptions: Option[] = [];
  public CityOptions: Option[] = [];

  public cityOptionsSelected: Option | null;
  public provinceOptionSelected: Option | null;

  ngOnInit(): void {
    this.provinceOptions = this.provinceService.getProvinceOption();
    this.CityOptions = this.provinceService.getCitieOption();

    this.dialog.afterClosed().subscribe(() => {
      this.store.dispatch(fromAddressAction.StopEdit());
    });

    this.initialAddressForm();

    this.store.select(fromAddressSelector.EditAddress).subscribe((address) => {
      if (address) {
        this.address = address;

        this.isEditMode = true;

        this.provinceOptionSelected = new Option(
          this.address.provinceName,
          this.address.provinceName,
          true
        );
        this.cityOptionsSelected = new Option(
          this.address.cityName,
          this.address.cityName,
          true,
          this.address.provinceName
        );

        this.addressForm.patchValue({
          addressLine: this.address.addressLine,
          postalCode: this.address.postalCode,
          numberPlate: this.address.numberPlate,
          unitNumber: this.address.unitNumber,
          recipentData: {
            recipientFirstName: this.address.recipientFirstName,
            recipientLastName: this.address.recipientLastName,
            recipientNationalCode: this.address.recipientNationalCode,
            recipientPhoneNumber: this.address.recipientPhoneNumber,
          },
        });
      }
      return;
    });
  }

  onSubmit() {
    if (!this.provinceOptionSelected && !this.cityOptionsSelected) return;
    this.dialog.close();

    if (this.isEditMode) return this.submitEditForm();
    else return this.submitCreateForm();
  }

  public OnCancelled() {
    this.store.dispatch(fromAddressAction.StopEdit());
    this.dialog.close();
  }
  public optionProvinceSelect(optionProvince: Option) {
    this.provinceOptionSelected = optionProvince;
  }

  public optionCitySelect(optionCity: Option) {
    this.cityOptionsSelected = optionCity;
  }

  private initialAddressForm() {
    this.addressForm = new FormGroup({
      addressLine: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(250),
      ]),
      postalCode: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]*$/),
      ]),
      numberPlate: new FormControl(null, [
        Validators.required,
        Validators.maxLength(4),
        Validators.pattern(/^[0-9]*$/),
      ]),
      unitNumber: new FormControl(null, [
        Validators.required,
        Validators.maxLength(4),
        Validators.pattern(/^[0-9]*$/),
      ]),
      recipentData: new FormGroup({
        recipientFirstName: new FormControl(null, [
          Validators.required,
          Validators.maxLength(100),
        ]),
        recipientLastName: new FormControl(null, [
          Validators.required,
          Validators.maxLength(100),
        ]),
        recipientNationalCode: new FormControl(null, [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern(/^[0-9]*$/),
        ]),
        recipientPhoneNumber: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(\+98|0)?9\d{9}$/),
        ]),
      }),
    });
  }

  private submitEditForm(): void {
    const address: AddressUpdateModel = new AddressUpdateModel(
      this.address.id,
      this.addressForm.controls.addressLine.value.trimEnd(),
      this.addressForm.controls.postalCode.value,
      this.addressForm.controls.numberPlate.value,
      this.addressForm.controls.unitNumber.value,
      this.cityOptionsSelected!.value,
      this.provinceOptionSelected!.value,
      this.addressForm
        .get(['recipentData', 'recipientFirstName'])
        ?.value.trimEnd(),
      this.addressForm
        .get(['recipentData', 'recipientLastName'])
        ?.value.trimEnd(),
      this.addressForm.get(['recipentData', 'recipientNationalCode'])?.value,
      this.addressForm.get(['recipentData', 'recipientPhoneNumber'])?.value
    );
    this.store.dispatch(
      fromAddressAction.UpdateAddressStart({ address: address })
    );
  }

  private submitCreateForm() {
    const address: AddressCreatedModel = new AddressCreatedModel(
      this.addressForm.controls.addressLine.value.trimEnd(),
      this.addressForm.controls.postalCode.value,
      this.addressForm.controls.numberPlate.value,
      this.addressForm.controls.unitNumber.value,
      this.cityOptionsSelected!.value ?? '',
      this.provinceOptionSelected!.value ?? '',
      this.addressForm
        .get(['recipentData', 'recipientFirstName'])
        ?.value.trimEnd(),
      this.addressForm
        .get(['recipentData', 'recipientLastName'])
        ?.value.trimEnd(),
      this.addressForm.get(['recipentData', 'recipientNationalCode'])?.value,
      this.addressForm.get(['recipentData', 'recipientPhoneNumber'])?.value
    );
    this.store.dispatch(
      fromAddressAction.CreateAddressStart({ addressCreateModel: address })
    );
  }
}
