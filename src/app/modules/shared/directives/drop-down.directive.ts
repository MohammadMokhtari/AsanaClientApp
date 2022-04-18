import {
  Directive,
  HostBinding,
  Renderer2,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropDown]',
})
export class DropDownDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostBinding('class.active') isActive: boolean = false;

  @HostListener('click') clickButton() {
    this.isActive = !this.isActive;
  }
}
