import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[backdrop]',
})
export class backdropDirective implements OnInit {
  constructor(private elemntRef: ElementRef, private renderer: Renderer2) {}

  public IsVisible: boolean = false;

  ngOnInit(): void {}

  show() {
    this.renderer.addClass(this.elemntRef.nativeElement, 'visible');
  }
}
