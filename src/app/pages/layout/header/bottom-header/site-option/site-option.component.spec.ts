import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteOptionComponent } from './site-option.component';

describe('SiteOptionComponent', () => {
  let component: SiteOptionComponent;
  let fixture: ComponentFixture<SiteOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
