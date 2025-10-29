import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() id: string = '';
}
