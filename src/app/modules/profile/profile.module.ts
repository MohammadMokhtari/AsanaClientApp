import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileWalletComponent } from './profile-wallet/profile-wallet.component';
import { ProfileAcceessMenuComponent } from './profile-acceess-menu/profile-acceess-menu.component';
import { UserFileUploadComponent } from './user-file-upload/user-file-upload.component';
import { ProfileOrdersComponent } from './profile-orders/profile-orders.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileCommentsComponent } from './profile-comments/profile-comments.component';
import { ProfileResetPasswordComponent } from './profile-reset-password/profile-reset-password.component';
import { ProfileDetailComponent } from './profile-info/profile-detail/profile-detail.component';
import { SharedModule } from '@shared-module/shared.module';
import { ProfileService } from './services/profile.service';
@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
    ProfileWalletComponent,
    ProfileInfoComponent,
    ProfileEditComponent,
    ProfileAcceessMenuComponent,
    ProfileOrdersComponent,
    ProfileResetPasswordComponent,
    ProfileCommentsComponent,
    ProfileDetailComponent,
    UserFileUploadComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
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
  providers: [ProfileService],
})
export class ProfileModule {}
