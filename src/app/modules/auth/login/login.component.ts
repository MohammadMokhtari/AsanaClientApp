import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../models/loginModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(private authService: AuthService, private router: Router) {}

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    this.isLoading = true;
    const loginModel = new LoginModel(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    );

    this.authService.loginUser(loginModel).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      (error) => {
        this.isLoading = false;
        Swal.fire('عملیات با شکست مواجه شد!', error, 'error');
      }
    );
  }
}
