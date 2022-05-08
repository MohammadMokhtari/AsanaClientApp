import { first } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProfileUpdateRequest } from '../models/profileUpdateRequest.model';
import { Option } from '@shared-module/forms/select/selectOption';
import { ProfileService } from '../services/profile.service';
import { UserProfile } from '../models/UserProfile';
import * as fromProfileSelector from '../store/profile.selector';
import * as fromProfileAction from '../store/profile.action';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
})
export class AccountEditComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private route: Router,
    private readonly store: Store<AppState>
  ) {
    this.genderOptions = this.profileService.genderOptions;
    this.initialAccountEditForm();
  }

  accountEditForm: FormGroup;

  genderOptionSelected: Option;
  public genderOptions: Option[];

  public isLoading: Observable<boolean>;
  public profileError: Observable<string | null>;

  ngOnInit(): void {
    this.isLoading = this.store.select(fromProfileSelector.isLoading);

    this.store
      .select(fromProfileSelector.userProfile)
      .subscribe((userProfile) => {
        if (userProfile !== null) {
          this.updateEditForm(userProfile);
          if (userProfile.gender !== 'Unknown') {
            this.genderOptionSelected = new Option(
              userProfile.gender === 'Male' ? 'مذکر' : 'مونث',
              userProfile.gender,
              true
            );
          } else {
            this.genderOptionSelected = new Option(
              'نامشخص',
              userProfile.gender,
              true
            );
          }
        }
      });
  }

  optionSelect(option: Option) {
    this.genderOptionSelected = option;
    this.accountEditForm.markAsDirty();
  }

  public onSubmit() {
    const profileUpdateRequest: ProfileUpdateRequest = new ProfileUpdateRequest(
      this.accountEditForm.controls.firstName.value,
      this.accountEditForm.controls.lastName.value,
      this.accountEditForm.controls.nationalCode.value,
      this.accountEditForm.controls.creditCardNumber.value,
      this.accountEditForm.controls.phoneNumber.value,
      this.genderOptionSelected.value
    );

    this.store.dispatch(
      fromProfileAction.ProfileUpdateStart(profileUpdateRequest)
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

  private updateEditForm(accountModel: UserProfile) {
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
}
