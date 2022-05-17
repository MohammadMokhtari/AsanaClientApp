import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared-module/shared.module';
import { ProfileAddressComponent } from './profile-address.component';
import { ProfileAddressItemComponent } from './profile-address-item/profile-address-item.component';
import { ProfileAddressEditDialogComponent } from './profile-address-edit/profile-address-edit-dialog.component';
import { ProfileAddressRoutingModule } from './profile-address-routing.module';

@NgModule({
  declarations: [
    ProfileAddressComponent,
    ProfileAddressItemComponent,
    ProfileAddressEditDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileAddressRoutingModule,
  ],
  exports: [ProfileAddressItemComponent, ProfileAddressEditDialogComponent],
})
export class ProfileAddressModule {}
