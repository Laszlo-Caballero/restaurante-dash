import { cx } from '@/utils/cx';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bagde',
  imports: [],
  templateUrl: './bagde.html',
})
export class Bagde {
  @Input() className: string = '';

  cx = cx;
}
