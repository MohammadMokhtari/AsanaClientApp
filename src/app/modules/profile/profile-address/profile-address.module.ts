import { ProfileAddressComponent } from './profile-address.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileAddressItemComponent } from './profile-address-item/profile-address-item.component';
import { ProfileAddressEditDialogComponent } from './profile-address-edit/profile-address-edit-dialog.component';
import { SharedModule } from '@shared-module/shared.module';
import { ProfileAddressRoutingModule } from './profile-address-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

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
