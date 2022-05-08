import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { DropDownComponent } from './drop-down/drop-down.component';
import { ConfirmEqualValidatorDirective } from './directives/confirm-equal-validator.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ModalComponent } from './modal/modal.component';
import { SelectComponent } from './forms/select/select.component';
import { OptionComponent } from './forms/option/option.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InnerLoadingSpinnerComponent } from './inner-loading-spinner/inner-loading-spinner.component';
import { ReminderComponent } from './reminder/reminder.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DropDownComponent,
    ConfirmEqualValidatorDirective,
    LoadingSpinnerComponent,
    ModalComponent,
    SelectComponent,
    OptionComponent,
    InnerLoadingSpinnerComponent,
    ReminderComponent,
  ],
  imports: [
    CommonModule,
    AngularSvgIconModule.forRoot(),
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
  exports: [
    DropDownComponent,
    AngularSvgIconModule,
    ConfirmEqualValidatorDirective,
    LoadingSpinnerComponent,
    ModalComponent,
    SelectComponent,
    OptionComponent,
    InnerLoadingSpinnerComponent,
    NgxSkeletonLoaderModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
  ],
  providers: [],
})
export class SharedModule {}
