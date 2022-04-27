import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { RegisterModel } from './../models/registerModel';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  isLoading: boolean = false;
  alertType: string = 'danger';
  constructor(private authService: AuthService, private router: Router) {}

  registrationForm: FormGroup;

  ngOnInit(): void {
    this.registrationForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl(null, Validators.required),
      },
      { validators: this.checkPasswords }
    );
  }

  onSubmit() {
    if (!this.registrationForm.valid) {
      return;
    }

    this.isLoading = true;

    const registerModel = new RegisterModel(
      this.registrationForm.controls.email.value,
      this.registrationForm.controls.password.value,
      this.registrationForm.controls.confirmPassword.value
    );

    this.authService.registerUser(registerModel).subscribe(
      (data) => {
        this.isLoading = false;
        this.router.navigate(['/']);
        Swal.fire(
          'ثبت نام شما با موفیت انجام شد',
          '<p>ایمیل حاوی لینک فعال سازی برای شما ارسال شد</p><small>لطفا پس از فعال سازی ایمیل وارد حساب کاربری خود شوید!</small>',
          'success'
        );
      },
      (error) => {
        this.isLoading = false;
        Swal.fire('عملیات با شکست مواجه شد!', error, 'error');
      }
    );

    this.registrationForm.reset();
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notEqual: true };
  };
}
