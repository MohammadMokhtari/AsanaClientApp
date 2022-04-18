import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMenuItemComponent } from './site-menu-item.component';

describe('SiteMenuItemComponent', () => {
  let component: SiteMenuItemComponent;
  let fixture: ComponentFixture<SiteMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
