import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeaderUserAreaComponent } from './top-header-user-area.component';

describe('TopHeaderUserAreaComponent', () => {
  let component: TopHeaderUserAreaComponent;
  let fixture: ComponentFixture<TopHeaderUserAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopHeaderUserAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopHeaderUserAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
