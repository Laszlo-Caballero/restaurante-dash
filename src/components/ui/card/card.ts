import { cx } from '@/utils/cx';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
})
export class Card {
  @Input() title = '';
  @Input() content = '';
  @Input() className = '';

  cx = cx;
}
