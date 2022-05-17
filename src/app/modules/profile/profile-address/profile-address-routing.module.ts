import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfileAddressComponent } from './profile-address.component';

const profileAddressRoutes: Routes = [
  {
    path: '',
    component: ProfileAddressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(profileAddressRoutes)],
  exports: [RouterModule],
})
export class ProfileAddressRoutingModule {}
