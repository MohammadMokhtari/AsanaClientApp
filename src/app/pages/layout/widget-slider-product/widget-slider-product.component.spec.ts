import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSliderProductComponent } from './widget-slider-product.component';

describe('WidgetSliderProductComponent', () => {
  let component: WidgetSliderProductComponent;
  let fixture: ComponentFixture<WidgetSliderProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetSliderProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetSliderProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
