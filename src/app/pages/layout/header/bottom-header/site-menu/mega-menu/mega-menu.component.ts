import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { MegaMenuItemComponent } from './mega-menu-item/mega-menu-item.component';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
})
export class MegaMenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @ViewChildren(MegaMenuItemComponent) items: QueryList<MegaMenuItemComponent>;

  deActiveAllItems() {
    this.items.forEach((item: any) => {
      item.isActive = false;
    });
  }
}
