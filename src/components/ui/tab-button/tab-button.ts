import { Component, inject, Input } from '@angular/core';
import { TabService } from '../../../services/tab/tab-service';
import { cx } from '../../../utils/cx';

@Component({
  selector: 'app-tab-button',
  imports: [],
  templateUrl: './tab-button.html',
})
export class TabButton {
  tabService = inject(TabService);
  cx = cx;

  @Input({
    required: true,
  })
  index!: number;
}
