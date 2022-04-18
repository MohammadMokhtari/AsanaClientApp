import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ResetPasswordModel } from '../models/resetPasswordModel';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  isLoading: boolean = false;
  resetPaswordForm: FormGroup;
  private code: string;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.queryParams['code'];

    if (!this.code) {
      this.router.navigate(['/']);
    }

    this.resetPaswordForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      { validators: this.checkPasswords }
    );
  }

  onSubmit() {
    this.isLoading = true;

    const resetPasswordModel = new ResetPasswordModel(
      this.resetPaswordForm.controls.email.value,
      this.resetPaswordForm.controls.password.value,
      this.resetPaswordForm.controls.confirmPassword.value,
      this.code
    );

    this.authService.resetPassword(resetPasswordModel).subscribe(
      (data) => {
        this.isLoading = false;
        Swal.fire(
          '',
          '<p>کلمه عبور با موفقیت تغیر یافت!</p><span>اکنون می توانید وارد حساب کاربری خود شوید</span>',
          'success'
        );
        this.router.navigate(['']);
      },
      (error) => {
        Swal.fire('عملیات با شکست مواجه شد!', error, 'error');
        this.isLoading = false;
      }
    );
    this.resetPaswordForm.reset();
  }
  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notEqual: true };
  };
}
