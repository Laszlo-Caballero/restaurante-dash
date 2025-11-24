import { cx } from '@/utils/cx';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.html',
})
export class Tabs {
  @Input() className?: string;

  cx = cx;
}
