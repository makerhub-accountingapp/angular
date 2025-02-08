import { AbstractControl, ValidationErrors } from "@angular/forms";

export class TransactionValidator {
  static optionValid(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value || value.id < 1) {
      return { optionNotSelected: true };
    }
    return null;
  }
}