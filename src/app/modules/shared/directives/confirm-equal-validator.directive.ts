import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function equalvalidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let pass = control.get('password')!.value;
    let confirmPass = control.get('confirmPassword')!.value;
    return pass === confirmPass ? null : { notEqual: true };
  };
}
@Directive({
  selector: '[appConfirmEqualValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmEqualValidatorDirective,
      multi: true,
    },
  ],
})
export class ConfirmEqualValidatorDirective implements Validator {
  constructor() {}
  validate(control: AbstractControl): ValidationErrors | null {
    return equalvalidator()(control);
  }
}
