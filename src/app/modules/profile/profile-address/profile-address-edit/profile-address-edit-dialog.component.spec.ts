import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAddressEditDialogComponent } from './profile-address-edit-dialog.component';

describe('AccountAddressEditComponent', () => {
  let component: ProfileAddressEditDialogComponent;
  let fixture: ComponentFixture<ProfileAddressEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileAddressEditDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAddressEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
