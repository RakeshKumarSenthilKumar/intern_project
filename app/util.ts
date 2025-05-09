import { FormGroup } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function setControlTouched(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach((key) => {
    formGroup.get(key)?.markAsTouched();
    formGroup.get(key)?.updateValueAndValidity();
  });
}

export function validateFormControl(control: AbstractControl) {
  const errors = {} as ValidationErrors;
  const controlErrors = control.errors;

  if (!control.value && controlErrors?.['required']) {
    errors['required'] = true;
  }
  if (
    controlErrors?.['minlength'] &&
    control.value.length < controlErrors?.['minlength']
  ) {
    errors['minLength'] = {
      requiredLength: controlErrors?.['minlength'],
      actualLength: control.value.length,
    };
  }
  if (
    controlErrors?.['maxlength'] &&
    control.value.length > controlErrors?.['maxlength']
  ) {
    errors['maxLength'] = {
      requiredLength: controlErrors?.['maxlength'],
      actualLength: control.value.length,
    };
  }
  if (
    controlErrors?.['pattern'] &&
    control.value &&
    !new RegExp(controlErrors?.['pattern']).test(control.value)
  ) {
    errors['pattern'] = true;
  }

  return Object.keys(errors).length ? errors : null;
}

export function getErrorMessage(
  errorKey: string,
  control: AbstractControl,
  label = '',
  errorMessages: Record<string, string> = {},
) {
  let controlName = '';
  if (control.parent) {
    controlName = Object.keys(control.parent.controls).find(key => control.parent?.get(key) === control) || '';
  }

  const controlErrors = control.errors;
  if (errorMessages[errorKey]) {
    return errorMessages[errorKey];
  } else if (errorKey === 'required') {
    return `${label} is required`;
  } else if (errorKey === 'minlength') {
    return `${label} should be atleast ${controlErrors?.['minlength']['requiredLength']} character`;
  } else if (errorKey === 'maxlength') {
    return `${label} cannot be more than ${controlErrors?.['maxlength']?.['requiredLength']} character`;
  }else if (errorKey === 'pattern' && controlName ==='name') { 
    return `Invalid ${label} pattern only letters are allowed`;
  }else if (errorKey === 'pattern') {
    return `Invalid ${label} pattern`;
  }
  return;
}
