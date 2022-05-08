import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountAddressItemComponent } from './account-address-item/account-address-item.component';
import { AccountAddressComponent } from './account-address.component';
import { AccountAddressEditDialogComponent } from './account-address-edit/account-address-edit-dialog.component';
import { SharedModule } from '@shared-module/shared.module';
import { AccountAddressRoutingModule } from './account-address-routing.module';

@NgModule({
  declarations: [
    AccountAddressComponent,
    AccountAddressItemComponent,
    AccountAddressEditDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AccountAddressRoutingModule,
  ],
  exports: [AccountAddressItemComponent, AccountAddressEditDialogComponent],
})
export class AccountAddressModule {}
