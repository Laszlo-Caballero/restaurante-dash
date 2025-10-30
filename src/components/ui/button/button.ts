import { Component, Input } from '@angular/core';
import { cx } from '../../../utils/cx';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  @Input({ required: false }) click: (event: Event) => void = () => {};
  @Input({ required: false }) type: 'button' | 'submit' | 'reset' = 'button';
  @Input({ required: false }) className: string = '';

  cx = cx;
}
