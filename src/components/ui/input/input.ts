import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputControl, InputError } from '../../../interfaces/input.interface';
import { cx } from '../../../utils/cx';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() id = '';
  @Input() control!: InputControl;
  @Input() errors: InputError[] = [];
  @Input() type: 'text' | 'password' | 'email' = 'text';

  @Input() value = '';
  @Input() disabled = false;
  onChange: (value: string) => void = () => {};
  onTouch: () => void = () => {};

  cx = cx;

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }
}
