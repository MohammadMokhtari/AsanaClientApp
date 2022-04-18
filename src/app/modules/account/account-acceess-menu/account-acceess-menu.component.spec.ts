import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAcceessMenuComponent } from './account-acceess-menu.component';

describe('AccountAcceessMenuComponent', () => {
  let component: AccountAcceessMenuComponent;
  let fixture: ComponentFixture<AccountAcceessMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAcceessMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAcceessMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
