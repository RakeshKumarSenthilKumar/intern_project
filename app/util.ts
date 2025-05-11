import { FormGroup } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function markAllFieldsTouched(group: FormGroup) {
  Object.keys(group.controls).forEach((fieldName) => {
    const field = group.get(fieldName);
    field?.markAsTouched();
    field?.updateValueAndValidity();
  });
}

export function checkValidationIssues(field: AbstractControl) {
  const validationIssues = {} as ValidationErrors;
  const fieldErrors = field.errors;

  if (!field.value && fieldErrors?.['required']) {
    validationIssues['required'] = true;
  }
  if (
    fieldErrors?.['minlength'] &&
    field.value.length < fieldErrors?.['minlength']
  ) {
    validationIssues['tooShort'] = {
      requiredLength: fieldErrors?.['minlength'],
      actualLength: field.value.length,
    };
  }
  if (
    fieldErrors?.['maxlength'] &&
    field.value.length > fieldErrors?.['maxlength']
  ) {
    validationIssues['tooLong'] = {
      requiredLength: fieldErrors?.['maxlength'],
      actualLength: field.value.length,
    };
  }
  if (
    fieldErrors?.['pattern'] &&
    field.value &&
    !new RegExp(fieldErrors?.['pattern']).test(field.value)
  ) {
    validationIssues['patternMismatch'] = true;
  }

  return Object.keys(validationIssues).length ? validationIssues : null;
}

export function generateValidationMessage(
  issueKey: string,
  field: AbstractControl,
  labelText = '',
  customMessages: Record<string, string> = {},
) {
  let fieldKey = '';
  if (field.parent) {
    fieldKey = Object.keys(field.parent.controls).find(key => field.parent?.get(key) === field) || '';
  }

  const currentErrors = field.errors;
  if (customMessages[issueKey]) {
    return customMessages[issueKey];
  } else if (issueKey === 'required') {
    return `${labelText} is required`;
  } else if (issueKey === 'minlength') {
    return `${labelText} should be at least ${currentErrors?.['minlength']['requiredLength']} characters`;
  } else if (issueKey === 'maxlength') {
    return `${labelText} cannot exceed ${currentErrors?.['maxlength']?.['requiredLength']} characters`;
  } else if (issueKey === 'pattern' && fieldKey === 'name') {
    return `Invalid ${labelText} format — only letters are allowed`;
  } else if (issueKey === 'pattern') {
    return `Invalid ${labelText} format`;
  }
  return;
}
