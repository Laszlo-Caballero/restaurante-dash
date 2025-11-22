import { Component, forwardRef, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputControl, InputError } from '../../../interfaces/input.interface';
import { cx } from '../../../utils/cx';

@Component({
  selector: 'app-text-area',
  imports: [FormsModule],
  templateUrl: './text-area.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextArea),
      multi: true,
    },
  ],
})
export class TextArea {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() id = '';
  @Input() control!: InputControl;
  @Input() errors: InputError[] = [];

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
