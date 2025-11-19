import { Component, EventEmitter, Input } from '@angular/core';
import { cx } from '../../../utils/cx';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
})
export class Modal {
  @Input({ required: false }) click = new EventEmitter();
  @Input({ required: false }) className?: string;
  cx = cx;
}
