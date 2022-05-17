import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {
  AddressCreatedModel,
  AddressUpdateModel,
} from './../model/addressCreateModel';
import { Address } from '../model/address.model';
import { Option } from '@shared-module/forms/select/selectOption';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressServices } from '../services/address.service';
import { ProvinceService } from '../services/province.Service';

@Component({
  selector: 'app-user-profile-address-edit',
  templateUrl: './profile-address-edit-dialog.component.html',
  styleUrls: ['./profile-address-edit-dialog.component.scss'],
})
export class ProfileAddressEditDialogComponent implements OnInit, OnDestroy {
  constructor(
    private addressService: AddressServices,
    private provinceService: ProvinceService,
    public dialog: MatDialogRef<ProfileAddressEditDialogComponent>
  ) {}

  private EditStartingSub: Subscription;
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

    this.initialAddressForm();

    this.EditStartingSub = this.addressService.editStarting.subscribe(
      (address) => {
        if (address) this.address = address;

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
    );
  }

  onSubmit() {
    if (!this.provinceOptionSelected && !this.cityOptionsSelected) return;

    if (this.isEditMode) return this.submitEditForm();
    else return this.submitCreateForm();
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
      +this.address.id,
      this.addressForm.controls.addressLine.value,
      this.addressForm.controls.postalCode.value,
      this.addressForm.controls.numberPlate.value,
      this.addressForm.controls.unitNumber.value,
      this.cityOptionsSelected!.value,
      this.provinceOptionSelected!.value,
      this.addressForm.get(['recipentData', 'recipientFirstName'])?.value,
      this.addressForm.get(['recipentData', 'recipientLastName'])?.value,
      this.addressForm.get(['recipentData', 'recipientNationalCode'])?.value,
      this.addressForm.get(['recipentData', 'recipientPhoneNumber'])?.value
    );
    this.addressService.updateAddress(address).subscribe(
      (_) => {
        Swal.fire({
          title: 'ویرایش آدرس',
          html: '<h6>آدرس  با موفقیت ویرایش شد</h6>',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#009ef7',
          confirmButtonText: 'باشه',
        });
        this.dialog.close();
      },
      (error) => {
        Swal.fire({
          title: 'ویرایش آدرس',
          html: `<h6>عملیات با شکست مواجعه شد لطفا بعدا دوباره تلاش کنید </h6><br><span>${error}</span>`,
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#f1416c',
          confirmButtonText: 'باشه',
        });
        this.dialog.close();
      }
    );
  }

  private submitCreateForm() {
    const address: AddressCreatedModel = new AddressCreatedModel(
      this.addressForm.controls.addressLine.value,
      this.addressForm.controls.postalCode.value,
      this.addressForm.controls.numberPlate.value,
      this.addressForm.controls.unitNumber.value,
      this.cityOptionsSelected!.value ?? '',
      this.provinceOptionSelected!.value ?? '',
      this.addressForm.get(['recipentData', 'recipientFirstName'])?.value,
      this.addressForm.get(['recipentData', 'recipientLastName'])?.value,
      this.addressForm.get(['recipentData', 'recipientNationalCode'])?.value,
      this.addressForm.get(['recipentData', 'recipientPhoneNumber'])?.value
    );
    this.addressService.createAddress(address).subscribe(
      (_) => {
        Swal.fire({
          title: 'ثبت آدرس',
          html: '<h6>آدرس جدید با موفقیت ثبت شد</h6>',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#009ef7',
          confirmButtonText: 'باشه',
        });
        this.dialog.close();
      },
      (error) => {
        Swal.fire({
          title: 'ثبت آدرس',
          html: `<h6>عملیات با شکست مواجعه شد لطفا بعدا دوباره تلاش کنید </h6><pan></pan>`,
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#f1416c',
          confirmButtonText: 'باشه',
        });
        this.dialog.close();
      }
    );
  }

  ngOnDestroy(): void {
    this.EditStartingSub?.unsubscribe();
  }
}
