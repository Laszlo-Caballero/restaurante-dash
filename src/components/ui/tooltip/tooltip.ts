import { Component, Input } from '@angular/core';
import { cx } from '../../../utils/cx';
import { PositionTooltip } from './enum';

@Component({
  selector: 'app-tooltip',
  imports: [],
  templateUrl: './tooltip.html',
  styleUrl: './tootip.css',
})
export class Tooltip {
  @Input({ required: true }) text!: string;
  @Input() disable = false;
  @Input({ required: false }) position: PositionTooltip = PositionTooltip.TOP;

  isHovered = false;
  cx = cx;

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  getPositionClasses() {
    const classes: Record<PositionTooltip, string> = {
      [PositionTooltip.TOP]: 'bottom-full left-1/2 transform -translate-x-1/2',
      [PositionTooltip.BOTTOM]: 'top-full left-1/2 transform -translate-x-1/2',
      [PositionTooltip.LEFT]: 'right-full top-1/2 transform -translate-y-1/2',
      [PositionTooltip.RIGHT]: 'left-full top-1/2 transform -translate-y-1/2',
    };

    return classes[PositionTooltip.BOTTOM];
  }
}
