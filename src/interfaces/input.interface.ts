import { AbstractControl } from '@angular/forms';

export type InputControl = AbstractControl<
  string | number | null,
  string | number | null,
  any
> | null;

export interface InputError {
  type: string;
  message: string;
}
