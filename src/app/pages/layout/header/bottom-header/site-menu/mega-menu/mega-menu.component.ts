import { LayoutService } from './../../../../services/layout.service';
import { CategoriesNavigationResponseModel } from './models/categoriesNavigationResponseModel';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MegaMenuItemComponent } from './mega-menu-item/mega-menu-item.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
})
export class MegaMenuComponent implements OnInit {
  constructor(private layoutService: LayoutService) {}

  categoriesNavigation$: Observable<CategoriesNavigationResponseModel[]>;

  ngOnInit(): void {
    this.categoriesNavigation$ = this.layoutService.getCategoriesNavgationObs();
  }

  @ViewChildren(MegaMenuItemComponent) items: QueryList<MegaMenuItemComponent>;

  deActiveAllItems() {
    this.items.forEach((item: any) => {
      item.isActive = false;
    });
  }
}
