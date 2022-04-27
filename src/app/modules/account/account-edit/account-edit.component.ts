import { environment } from './../../../../environments/environment';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AccountUpdateRequestModel } from '../models/accountUpdateRequest.model';
import { Option } from '@shared-module/forms/select/selectOption';
import { AccountService } from '../services/account.service';
import { AccountModel } from './../models/account.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
})
export class AccountEditComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route: Router
  ) {
    this.initialAccountEditForm();
  }

  accountEditForm: FormGroup;

  accountsub: Subscription;

  genderOption: Option = new Option('مذکر', 'Male');

  public genderOptions = [
    new Option('مذکر', 'Male'),
    new Option('مونث', 'Female'),
    new Option('نامشخص', 'Unknown'),
  ];

  public isLoading: boolean = false;

  public accountModel: AccountModel | null;

  public isUnchanged: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.accountsub = this.accountService.AccountSub.subscribe((data) => {
      this.accountModel = data;
      if (data !== null) {
        this.updateEditForm(data);
      }
      this.isLoading = false;
    });
  }
  public domainName = environment.domainName;

  optionSelect(option: Option) {
    this.genderOption = option;
  }

  public onSubmit() {
    this.isLoading = true;
    const accountRequestModel: AccountUpdateRequestModel =
      new AccountUpdateRequestModel(
        this.accountEditForm.controls.firstName.value,
        this.accountEditForm.controls.lastName.value,
        this.accountEditForm.controls.nationalCode.value,
        this.accountEditForm.controls.creditCardNumber.value,
        this.accountEditForm.controls.phoneNumber.value,
        this.genderOption.value
      );
    this.accountService.UpdateAccount(accountRequestModel).subscribe(
      (_) => {
        this.isLoading = false;
        this.route.navigate(['account']);
        Swal.fire('', '<p>حساب کاربری با موفقیت به روز شد</p>', 'success');
      },
      (error) => {
        this.isLoading = false;
        Swal.fire('عملیات با شکست مواجه شد!', error, 'error');
      }
    );
  }

  public onCancel() {
    this.route.navigate(['account']);
  }

  private initialAccountEditForm() {
    this.accountEditForm = this.formBuilder.group({
      firstName: new FormControl(null, [Validators.maxLength(220)]),
      lastName: new FormControl(null, [Validators.maxLength(220)]),
      creditCardNumber: new FormControl(null, [
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern(/^[0-9]*$/),
      ]),
      phoneNumber: new FormControl(null, [
        Validators.pattern(/^(\+98|0)?9\d{9}$/),
      ]),
      nationalCode: new FormControl(null, [
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(/^[0-9]*$/),
      ]),
    });
  }

  private updateEditForm(accountModel: AccountModel) {
    const option = this.genderOptions.find((option) => {
      return option.value === accountModel.gender;
    });

    option!.isActive = true;
    this.accountEditForm.get('firstName')?.setValue(accountModel.firstName);
    this.accountEditForm.get('lastName')?.setValue(accountModel.lastName);
    this.accountEditForm
      .get('creditCardNumber')
      ?.setValue(accountModel.creditCardNumber);
    this.accountEditForm.get('phoneNumber')?.setValue(accountModel.mobile);
    this.accountEditForm
      .get('nationalCode')
      ?.setValue(accountModel.nationalCode);
  }

  ngOnDestroy(): void {
    this.accountsub.unsubscribe();
  }
}
