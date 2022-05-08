import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/store/app.reducer';
import { Address } from '../../../../../../modules/account/account-address/model/address.model';
import { ModalComponent } from '@shared-module/modal/modal.component';
import { ModalConfig } from '@shared-module/modal/modalConfig';
import * as fromAddressAction from '../../../../../../modules/account/account-address/store/address.action';
import * as fromAddressSelector from '../../../../../../modules/account/account-address/store/address.selector';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.scss'],
})
export class UserLocationComponent implements OnInit {
  constructor(private readonly store: Store<AppState>) {}
  public setDefaultLocation = new EventEmitter<string>();

  public isLoading$: Observable<boolean>;

  modalConfig: ModalConfig = {
    headerTitle: 'انتخاب آدرس',
  };

  @ViewChild('modal') modalComponent: ModalComponent;

  public addresses$: Observable<Address[] | null>;

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromAddressSelector.isLoading);
    this.addresses$ = this.store.select(fromAddressSelector.Addresses);
  }

  selectItem(addressId: string) {
    this.store.dispatch(
      fromAddressAction.SetDefaultAddressStart({ addressId: addressId })
    );
    this.modalComponent.close();
  }

  openModal() {
    this.addresses$.pipe(take(1)).subscribe((data) => {
      console.log(data);
      if (data!.length <= 1) {
        this.store.dispatch(fromAddressAction.GetAddressesStart());
        this.modalComponent.open();
      } else {
        this.modalComponent.open();
      }
    });
  }
}
