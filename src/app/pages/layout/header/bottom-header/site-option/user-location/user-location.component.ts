import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  EventEmitter,
  ViewChild,
  OnDestroy,
} from '@angular/core';

import { AddressService } from './service/address.service';
import { Address } from './address.model';
import { ModalComponent } from '@shared-module/modal/modal.component';
import { ModalConfig } from '@shared-module/modal/modalConfig';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.scss'],
})
export class UserLocationComponent implements OnInit, OnDestroy {
  constructor(private addressService: AddressService) {}
  public setDefaultLocation = new EventEmitter<string>();
  public isLoading: boolean = false;

  private subscription: Subscription;

  modalConfig: ModalConfig = {
    headerTitle: 'انتخاب آدرس',
  };

  @ViewChild('modal') modalComponent: ModalComponent;

  public locations: Address[] = [];

  ngOnInit(): void {}

  selectItem(locationId: string) {
    this.isLoading = true;
    this.addressService.changeDefaultAddress(locationId).subscribe((data) => {
      this.isLoading = false;
    });
    this.modalComponent.close();
  }

  openModal() {
    if (this.locations.length === 0) {
      this.isLoading = true;
      this.subscription = this.addressService.fetchAddress().subscribe((_) => {
        this.locations = this.addressService.getAddresses();
        this.isLoading = false;
        this.modalComponent.open();
      });
    } else {
      this.modalComponent.open();
    }
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
