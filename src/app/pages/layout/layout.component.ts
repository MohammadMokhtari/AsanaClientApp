import { routeAnimation } from './../../animations/routeAnimation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routeAnimation],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
