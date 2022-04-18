import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mega-menu-item',
  templateUrl: './mega-menu-item.component.html',
  styleUrls: ['./mega-menu-item.component.scss'],
})
export class MegaMenuItemComponent {
  constructor() {}
  name: string = 'کالای دیجیتال';
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
