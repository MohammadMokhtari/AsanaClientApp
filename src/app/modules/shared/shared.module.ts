import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { BackDropComponent } from './back-drop/back-drop.component';
import { DropDownDirective } from './directives/drop-down.directive';
import { DropDownComponent } from './drop-down/drop-down.component';
import { ConfirmEqualValidatorDirective } from './directives/confirm-equal-validator.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ModalComponent } from './modal/modal.component';
import { FormSelectDirective } from './directives/form-select.directive';
import { SelectComponent } from './forms/select/select.component';
import { OptionComponent } from './forms/option/option.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InnerLoadingSpinnerComponent } from './inner-loading-spinner/inner-loading-spinner.component';

@NgModule({
  declarations: [
    BackDropComponent,
    DropDownDirective,
    DropDownComponent,
    ConfirmEqualValidatorDirective,
    LoadingSpinnerComponent,
    ModalComponent,
    FormSelectDirective,
    SelectComponent,
    OptionComponent,
    InnerLoadingSpinnerComponent,
  ],
  imports: [CommonModule, AngularSvgIconModule.forRoot(), ReactiveFormsModule],
  exports: [
    BackDropComponent,
    DropDownDirective,
    DropDownComponent,
    AngularSvgIconModule,
    ConfirmEqualValidatorDirective,
    LoadingSpinnerComponent,
    ModalComponent,
    FormSelectDirective,
    SelectComponent,
    OptionComponent,
    InnerLoadingSpinnerComponent,
  ],
  providers: [],
})
export class SharedModule {}
