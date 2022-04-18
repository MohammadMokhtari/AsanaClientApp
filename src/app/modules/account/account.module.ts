import { MatCardModule } from '@angular/material/card';
import { AccountComponent } from './account.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';

import { AccountRoutingModule } from './account-routing.module';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountAddressComponent } from './account-address/account-address.component';
import { AccountWalletComponent } from './account-wallet/account-wallet.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { SharedModule } from '@shared-module/shared.module';
import { AccountAcceessMenuComponent } from './account-acceess-menu/account-acceess-menu.component';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { AccountResetPasswordComponent } from './account-reset-password/account-reset-password.component';
import { AccountCommentsComponent } from './account-comments/account-comments.component';
import { AccountDetailComponent } from './account-info/account-detail/account-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './services/account.service';
import { UserFileUploadComponent } from './user-file-upload/user-file-upload.component';
import { AccountAddressItemComponent } from './account-address/account-address-item/account-address-item.component';
import { AccountAddressEditDialogComponent } from './account-address/account-address-edit/account-address-edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AccountComponent,
    AccountInfoComponent,
    AccountAddressComponent,
    AccountWalletComponent,
    AccountEditComponent,
    AccountAcceessMenuComponent,
    AccountOrdersComponent,
    AccountResetPasswordComponent,
    AccountCommentsComponent,
    AccountDetailComponent,
    UserFileUploadComponent,
    AccountAddressItemComponent,
    AccountAddressEditDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
  ],
  exports: [],
  providers: [AccountService],
})
export class AccountModule {}
