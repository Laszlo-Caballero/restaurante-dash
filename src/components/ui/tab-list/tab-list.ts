import { Component, ContentChildren, inject, Input, QueryList } from '@angular/core';
import { TabService } from '@/services/tab/tab-service';
import { NgTemplateOutlet } from '@angular/common';
import { Tab } from '../tab/tab';
import { cx } from '@/utils/cx';

@Component({
  selector: 'app-tab-list',
  imports: [NgTemplateOutlet],
  templateUrl: './tab-list.html',
})
export class TabList {
  tabService = inject(TabService);

  @Input() className = '';

  cx = cx;

  @ContentChildren(Tab) tabs!: QueryList<Tab>;
}
