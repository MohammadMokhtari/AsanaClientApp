import { Option } from './../select/selectOption';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent {
  constructor() {}

  @Output() optionSelected = new EventEmitter<Option>();

  @Input() option: Option;

  public select() {
    this.optionSelected.emit(this.option);
  }
}
