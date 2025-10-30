import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  imports: [RouterOutlet, NgxSonnerToaster],
})
export class App {
  protected readonly title = signal('restaurante-dash');
}
