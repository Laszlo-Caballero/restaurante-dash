import { Component, OnInit } from '@angular/core';
import { LayoutGrid, LucideAngularModule, Utensils } from 'lucide-angular';
import { cx } from '../../../utils/cx';
import { Link } from '../../ui/link/link';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [LucideAngularModule, Link],
  templateUrl: './aside.html',
})
export class Aside {
  readonly LayoutGridIcon = LayoutGrid;
  readonly UtensilsIcon = Utensils;

  currentRoute: string = '';
  cx = cx;
}
