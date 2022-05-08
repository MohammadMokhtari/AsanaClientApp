import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { AppState } from 'src/app/store/app.reducer';
import { AccountAddressEditDialogComponent } from './../account-address-edit/account-address-edit-dialog.component';
import { Address } from '../model/address.model';
import * as fromAddressAction from '../store/address.action';
@Component({
  selector: 'app-account-address-item',
  templateUrl: './account-address-item.component.html',
  styleUrls: ['./account-address-item.component.scss'],
})
export class AccountAddressItemComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private readonly store: Store<AppState>
  ) {}

  @Input() public address: Address;

  ngOnInit(): void {}

  onSelectDefault() {
    this.store.dispatch(
      fromAddressAction.SetDefaultAddressStart({
        addressId: this.address.id,
      })
    );
  }

  onEdit() {
    this.dialog.open(AccountAddressEditDialogComponent);
    this.store.dispatch(fromAddressAction.StartEdit({ address: this.address }));
  }

  onDelete() {
    const swlResut = Swal.fire({
      title: 'حذف آدریس',
      html: '<h6>آیا از حذف آدرس مطمعن هستید؟</h6>',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'بیخیال',
      cancelButtonColor: '#f1416c',
      confirmButtonColor: '#009ef7',
      confirmButtonText: 'حذف بشه',
    });
    swlResut.then((res) => {
      if (res.isConfirmed) {
        this.store.dispatch(
          fromAddressAction.DeleteAddressStart({ addressId: this.address.id })
        );
      } else if (res.isDenied || res.dismiss) {
        return;
      }
    });
  }
}
