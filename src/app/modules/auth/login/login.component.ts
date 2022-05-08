import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginModel } from '../models/loginModel';
import { AppState } from 'src/app/store/app.reducer';
import * as fromAuthAction from '../Store/auth-actions';
import * as fromAuthSelector from '../Store/auth.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private readonly store: Store<AppState>) {}

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromAuthSelector.isLoading);

    this.initialForm();
  }

  onSubmit() {
    const loginModel = new LoginModel(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    );

    this.store.dispatch(fromAuthAction.LoginStart(loginModel));
  }

  private initialForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
}
