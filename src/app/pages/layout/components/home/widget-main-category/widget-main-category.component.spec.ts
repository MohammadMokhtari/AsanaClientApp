import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetMainCategoryComponent } from './widget-main-category.component';

describe('WidgetMainCategoryComponent', () => {
  let component: WidgetMainCategoryComponent;
  let fixture: ComponentFixture<WidgetMainCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetMainCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetMainCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
