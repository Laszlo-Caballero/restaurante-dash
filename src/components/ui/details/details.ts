import { Component, Input } from '@angular/core';
import { cx } from '../../../utils/cx';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
})
export class Details {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) subtitle!: string;
  @Input() className: string = '';
  @Input() childrenClassName: string = '';

  cx = cx;
}
