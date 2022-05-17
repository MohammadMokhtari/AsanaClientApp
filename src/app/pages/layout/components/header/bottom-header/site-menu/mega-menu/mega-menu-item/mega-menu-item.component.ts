import { CategoriesNavigationResponseModel } from './../models/categoriesNavigationResponseModel';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mega-menu-item',
  templateUrl: './mega-menu-item.component.html',
  styleUrls: ['./mega-menu-item.component.scss'],
})
export class MegaMenuItemComponent {
  constructor() {}
  @Input() navigationCategory: CategoriesNavigationResponseModel;
  icon: string = 'digital.svg';

  @Output() itemSelected = new EventEmitter();
  @Input() isActive: boolean = false;

  onMouseEnterHandler() {
    this.itemSelected.emit();
    this.isActive = true;
  }
  onMouseLeaveHandler(event: any) {
    if (event.relatedTarget.className === 'menu_item') {
      this.isActive = false;
    }
  }
}
