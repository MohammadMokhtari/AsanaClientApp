import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLocationItemComponent } from './user-location-item.component';

describe('UserLocationItemComponent', () => {
  let component: UserLocationItemComponent;
  let fixture: ComponentFixture<UserLocationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLocationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLocationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
