import { BackDropService } from './../../../../services/backdrop-highlight.service';
import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-site-menu-item',
  templateUrl: './site-menu-item.component.html',
  styleUrls: ['./site-menu-item.component.scss'],
})
export class SiteMenuItemComponent implements OnInit {
  constructor(private backDropService: BackDropService) {}

  ngOnInit(): void {}

  @Input() hasEmitbackdrop: boolean = false;
  isOpen: boolean = false;

  onMouseEnterHandler() {
    this.isOpen = true;
    if (this.hasEmitbackdrop) this.backDropService.backdropSelected.emit(true);
  }
  onMouseLeaveHandler() {
    this.isOpen = false;
    if (this.hasEmitbackdrop) this.backDropService.backdropSelected.emit(false);
  }
}
