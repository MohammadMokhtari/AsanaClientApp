import Swal from 'sweetalert2';
import { AccountAddressEditDialogComponent } from './../account-address-edit/account-address-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Address } from '../model/address.model';
import { Component, Input, OnInit } from '@angular/core';
import { AddressServices } from '../services/address.service';

@Component({
  selector: 'app-account-address-item',
  templateUrl: './account-address-item.component.html',
  styleUrls: ['./account-address-item.component.scss'],
})
export class AccountAddressItemComponent implements OnInit {
  constructor(
    private addressService: AddressServices,
    public dialog: MatDialog
  ) {}

  @Input() public address: Address;

  ngOnInit(): void {}

  onSelectDefault() {
    this.addressService.SetDefaultAddress(this.address);
  }

  onUpdate() {
    this.dialog
      .open(AccountAddressEditDialogComponent)
      .afterOpened()
      .subscribe(() => {
        this.addressService.editStarting.next(this.address);
      });
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
        this.addressService.deleteAddress(+this.address.id).subscribe();
      } else if (res.isDenied || res.dismiss) {
        return;
      }
    });
  }
}
