import { Observable } from 'rxjs';
import { LayoutService } from './../services/layout.service';
import { Component, OnInit } from '@angular/core';
import { MainCategories } from '../Models/mainCategories';

@Component({
  selector: 'app-widget-main-category',
  templateUrl: './widget-main-category.component.html',
  styleUrls: ['./widget-main-category.component.scss'],
})
export class WidgetMainCategoryComponent implements OnInit {
  constructor(private LayoutService: LayoutService) {}

  public mainCategories$: Observable<MainCategories[]>;

  ngOnInit(): void {
    this.mainCategories$ = this.LayoutService.getMaincategoriesObs();
  }
}
