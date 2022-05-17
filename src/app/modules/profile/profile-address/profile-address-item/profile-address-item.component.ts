import Swal from 'sweetalert2';
import { ProfileAddressEditDialogComponent } from '../profile-address-edit/profile-address-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Address } from '../model/address.model';
import { Component, Input, OnInit } from '@angular/core';
import { AddressServices } from '../services/address.service';

@Component({
  selector: 'app-profile-address-item',
  templateUrl: './profile-address-item.component.html',
  styleUrls: ['./profile-address-item.component.scss'],
})
export class ProfileAddressItemComponent implements OnInit {
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
      .open(ProfileAddressEditDialogComponent)
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
