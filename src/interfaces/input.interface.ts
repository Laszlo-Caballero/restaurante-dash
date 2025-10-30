import { AbstractControl } from '@angular/forms';

export type InputControl = AbstractControl<string | null, string | null, any> | null;

export interface InputError {
  type: string;
  message: string;
}
