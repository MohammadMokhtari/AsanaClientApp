import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOrdersComponent } from './profile-orders.component';

describe('AccountOrdersComponent', () => {
  let component: ProfileOrdersComponent;
  let fixture: ComponentFixture<ProfileOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
