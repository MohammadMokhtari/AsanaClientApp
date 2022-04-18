import { Component, Input, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-widget-slider-product',
  templateUrl: './widget-slider-product.component.html',
  styleUrls: ['./widget-slider-product.component.scss'],
})
export class WidgetSliderProductComponent implements OnInit {
  constructor() {}

  @Input() title: string;

  ngOnInit(): void {}

  config: SwiperOptions = {
    slidesPerView: 6,
    fadeEffect: {
      crossFade: true,
    },
    //   autoplay: {
    //     delay: 3500,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: true,
    //   },
    spaceBetween: 0,
    loop: true,
    mousewheel: true,
    speed: 500,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      980: {
        slidesPerView: 6,
        spaceBetween: 0,
      },
    },
  };
}
