import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  EventEmitter,
  ViewChild,
  OnDestroy,
} from '@angular/core';

import { Address } from '../../../../../../modules/account/account-address/model/address.model';
import { ModalComponent } from '@shared-module/modal/modal.component';
import { ModalConfig } from '@shared-module/modal/modalConfig';
import { AddressServices } from 'src/app/modules/account/account-address/services/address.service';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.scss'],
})
export class UserLocationComponent implements OnInit, OnDestroy {
  constructor(private addressService: AddressServices) {}
  public setDefaultLocation = new EventEmitter<string>();
  public isLoading: boolean = false;

  private subscription: Subscription;
  private AddressChangedSubscription: Subscription;

  modalConfig: ModalConfig = {
    headerTitle: 'انتخاب آدرس',
  };

  @ViewChild('modal') modalComponent: ModalComponent;

  public locations: Address[] = [];

  ngOnInit(): void {}

  selectItem(locationId: string) {
    this.isLoading = true;
    this.addressService.changeDefaultAddress(locationId).subscribe((_) => {
      this.isLoading = false;
    });
    this.modalComponent.close();
  }

  openModal() {
    if (this.locations.length === 0) {
      this.isLoading = true;
      this.subscription = this.addressService.getAddresses().subscribe((_) => {
        this.locations = this.addressService.AllAddresses();
        this.isLoading = false;
        this.modalComponent.open();
      });
    } else {
      this.modalComponent.open();
    }
    this.AddressChangedSubscription =
      this.addressService.addressesChanged.subscribe((address) => {
        this.locations = address;
      });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.AddressChangedSubscription?.unsubscribe();
  }
}
