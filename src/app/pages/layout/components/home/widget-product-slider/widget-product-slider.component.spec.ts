import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetProductSliderComponent } from './widget-product-slider.component';

describe('WidgetSliderProductComponent', () => {
  let component: WidgetProductSliderComponent;
  let fixture: ComponentFixture<WidgetProductSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetProductSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetProductSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
