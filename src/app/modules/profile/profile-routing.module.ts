import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileCommentsComponent } from './profile-comments/profile-comments.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileOrdersComponent } from './profile-orders/profile-orders.component';
import { ProfileResetPasswordComponent } from './profile-reset-password/profile-reset-password.component';
import { ProfileWalletComponent } from './profile-wallet/profile-wallet.component';
import { ProfileComponent } from './profile.component';

const profileRoute: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ProfileInfoComponent,
      },
      {
        path: 'wallet',
        component: ProfileWalletComponent,
      },
      {
        path: 'edit',
        component: ProfileEditComponent,
      },
      {
        path: 'address',
        loadChildren: () =>
          import('../profile/profile-address/profile-address.module').then(
            (m) => m.ProfileAddressModule
          ),
      },
      {
        path: 'reset-password',
        component: ProfileResetPasswordComponent,
      },
      {
        path: 'orders',
        component: ProfileOrdersComponent,
      },
      {
        path: 'comments',
        component: ProfileCommentsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(profileRoute)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
