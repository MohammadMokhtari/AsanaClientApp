import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAddressItemComponent } from './account-address-item.component';

describe('AccountAddressItemComponent', () => {
  let component: AccountAddressItemComponent;
  let fixture: ComponentFixture<AccountAddressItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAddressItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAddressItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
