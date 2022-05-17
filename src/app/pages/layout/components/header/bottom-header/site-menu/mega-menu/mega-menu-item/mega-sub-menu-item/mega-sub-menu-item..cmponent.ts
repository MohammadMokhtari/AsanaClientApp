import { CategoriesNavigationResponseModel } from './../../models/categoriesNavigationResponseModel';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mega-sub-menu-item',
  template: `
    <li class="sub-categoty-item">
      <h4>
        <a>
          {{ navigationCategory.name }}
          <i class="material-icons icon-sm">arrow_drop_down</i>
        </a>
      </h4>
      <ul class="inner_categori">
        <ng-container
          *ngFor="let subCategory of navigationCategory.childCategories"
        >
          <li>
            <a>{{ subCategory.name }}</a>
            <ul *ngFor="let cat of subCategory.childCategories">
              <li class="sub-inner-category-item">
                {{ cat.name }}
              </li>
            </ul>
          </li>
        </ng-container>
      </ul>
    </li>
  `,
  styleUrls: ['./mega-sub-menu-item-component.scss'],
})
export class MegaSubMenuItemComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  @Input() navigationCategory: CategoriesNavigationResponseModel;
}
