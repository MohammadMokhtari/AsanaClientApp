import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileResetPasswordComponent } from './profile-reset-password.component';

describe('AccountResetPasswordComponent', () => {
  let component: ProfileResetPasswordComponent;
  let fixture: ComponentFixture<ProfileResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
