import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, NgxSonnerToaster],
})
export class App {
  protected readonly title = signal('restaurante-dash');
}
