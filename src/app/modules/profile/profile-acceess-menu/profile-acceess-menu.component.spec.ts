import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAcceessMenuComponent } from './profile-acceess-menu.component';

describe('AccountAcceessMenuComponent', () => {
  let component: ProfileAcceessMenuComponent;
  let fixture: ComponentFixture<ProfileAcceessMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAcceessMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAcceessMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
