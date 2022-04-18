import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ForgotPasswordModel } from './../models/forgotPasswordModel';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  forgotPasswordForm: FormGroup;

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
    });
  }
  onSubmit() {
    this.isLoading = true;
    const forgotModel: ForgotPasswordModel = new ForgotPasswordModel(
      this.forgotPasswordForm.controls.email.value
    );
    this.authService.forgotPassword(forgotModel).subscribe(
      (res) => {
        this.isLoading = false;
        Swal.fire(
          '',
          '<p>ایمیلی حاوی لینک  فراموشی کلمه عبور برای شما ارسال شد!</p><span>ایمیل خود راچک کنید</span>',
          'info'
        );
      },
      (err) => {
        this.isLoading = false;
        Swal.fire('عملیات با شکست مواجه شد!', err, 'error');
      }
    );
  }
}
