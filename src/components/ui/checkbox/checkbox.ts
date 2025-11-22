import { Component, Input } from '@angular/core';
import { cx } from '@/utils/cx';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './checkbox.html',
})
export class Checkbox {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() value = false;
  @Input() className = '';
  @Input() classNameLabel = '';

  cx = cx;
}
