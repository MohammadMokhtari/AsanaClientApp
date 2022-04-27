import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAddressEditDialogComponent } from './account-address-edit-dialog.component';

describe('AccountAddressEditComponent', () => {
  let component: AccountAddressEditDialogComponent;
  let fixture: ComponentFixture<AccountAddressEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountAddressEditDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAddressEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
