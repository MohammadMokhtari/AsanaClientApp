import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCrComponent } from './footer-cr.component';

describe('FooterCrComponent', () => {
  let component: FooterCrComponent;
  let fixture: ComponentFixture<FooterCrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterCrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
