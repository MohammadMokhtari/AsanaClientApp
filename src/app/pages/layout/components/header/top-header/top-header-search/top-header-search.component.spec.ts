import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeaderSearchComponent } from './top-header-search.component';

describe('TopHeaderSearchComponent', () => {
  let component: TopHeaderSearchComponent;
  let fixture: ComponentFixture<TopHeaderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopHeaderSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopHeaderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
