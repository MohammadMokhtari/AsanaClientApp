import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerLoadingSpinnerComponent } from './inner-loading-spinner.component';

describe('InnerLoadingSpinnerComponent', () => {
  let component: InnerLoadingSpinnerComponent;
  let fixture: ComponentFixture<InnerLoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerLoadingSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerLoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
