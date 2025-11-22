import { Component, Input } from '@angular/core';
import { cx } from '@/utils/cx';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-link',
  imports: [RouterLink],
  templateUrl: './link.html',
})
export class Link {
  cx = cx;
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  @Input() href: string = '';
}
