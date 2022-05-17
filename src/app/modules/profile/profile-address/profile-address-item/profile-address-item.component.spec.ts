import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAddressItemComponent } from './profile-address-item.component';

describe('AccountAddressItemComponent', () => {
  let component: ProfileAddressItemComponent;
  let fixture: ComponentFixture<ProfileAddressItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAddressItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAddressItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
