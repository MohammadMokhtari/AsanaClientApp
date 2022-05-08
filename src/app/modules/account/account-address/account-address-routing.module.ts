import { AccountAddressComponent } from './account-address.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const accountAddressRoutes: Routes = [
  {
    path: '',
    component: AccountAddressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountAddressRoutes)],
  exports: [RouterModule],
})
export class AccountAddressRoutingModule {}
