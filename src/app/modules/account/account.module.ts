import { ProfileEffect } from './store/profile.effects';
import { EffectsModule } from '@ngrx/effects';
import { AccountComponent } from './account.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountWalletComponent } from './account-wallet/account-wallet.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { SharedModule } from '@shared-module/shared.module';
import { AccountAcceessMenuComponent } from './account-acceess-menu/account-acceess-menu.component';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { AccountResetPasswordComponent } from './account-reset-password/account-reset-password.component';
import { AccountCommentsComponent } from './account-comments/account-comments.component';
import { AccountDetailComponent } from './account-info/account-detail/account-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from './services/profile.service';
import { UserFileUploadComponent } from './user-file-upload/user-file-upload.component';
@NgModule({
  declarations: [
    AccountComponent,
    AccountInfoComponent,
    AccountWalletComponent,
    AccountEditComponent,
    AccountAcceessMenuComponent,
    AccountOrdersComponent,
    AccountResetPasswordComponent,
    AccountCommentsComponent,
    AccountDetailComponent,
    UserFileUploadComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([ProfileEffect]),
    AccountRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [ProfileService],
})
export class AccountModule {}
