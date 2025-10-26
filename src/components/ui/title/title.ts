import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.html',
})
export class Title {
  @Input({
    required: true,
  })
  title: string = '';
  @Input({
    required: false,
  })
  subtitle?: string = '';
}
