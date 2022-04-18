import { BackDropService } from './../../../pages/layout/services/backdrop-highlight.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-drop',
  templateUrl: './back-drop.component.html',
  styleUrls: ['./back-drop.component.scss'],
})
export class BackDropComponent implements OnInit {
  constructor(private backDropHighlightService: BackDropService) {}

  isActive: boolean = false;

  ngOnInit(): void {
    this.backDropHighlightService.backdropSelected.subscribe((date) => {
      this.isActive = date;
    });
  }
}
