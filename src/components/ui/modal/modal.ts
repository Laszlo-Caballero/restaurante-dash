import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
})
export class Modal {
  @Input({ required: false }) click = new EventEmitter();
}
