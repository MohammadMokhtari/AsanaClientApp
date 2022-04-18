import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { AccountResetPasswordComponent } from './account-reset-password/account-reset-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountWalletComponent } from './account-wallet/account-wallet.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountComponent } from './account.component';
import { AccountAddressComponent } from './account-address/account-address.component';
import { AccountCommentsComponent } from './account-comments/account-comments.component';

const accountRoute: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        component: AccountInfoComponent,
      },
      {
        path: 'wallet',
        component: AccountWalletComponent,
      },
      {
        path: 'edit',
        component: AccountEditComponent,
      },
      {
        path: 'address',
        component: AccountAddressComponent,
      },
      {
        path: 'reset-password',
        component: AccountResetPasswordComponent,
      },
      {
        path: 'orders',
        component: AccountOrdersComponent,
      },
      {
        path: 'comments',
        component: AccountCommentsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountRoute)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
