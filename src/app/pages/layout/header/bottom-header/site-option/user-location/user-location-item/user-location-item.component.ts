import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Address } from '../../../../../../../modules/account/account-address/model/address.model';

@Component({
  selector: 'app-user-location-item',
  templateUrl: './user-location-item.component.html',
  styleUrls: ['./user-location-item.component.scss'],
})
export class UserLocationItemComponent implements OnInit {
  constructor() {}

  @Input() public address: Address;

  @Output() onSelectEvent = new EventEmitter<string>();

  ngOnInit(): void {}

  select(addreessId: string) {
    if (this.address.isDefault) {
      return;
    }
    this.onSelectEvent.emit(addreessId);
  }
}
