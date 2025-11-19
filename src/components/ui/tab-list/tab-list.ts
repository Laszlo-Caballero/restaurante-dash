import { Component, ContentChildren, inject, QueryList } from '@angular/core';
import { TabService } from '../../../services/tab/tab-service';
import { NgTemplateOutlet } from '@angular/common';
import { Tab } from '../tab/tab';

@Component({
  selector: 'app-tab-list',
  imports: [NgTemplateOutlet],
  templateUrl: './tab-list.html',
})
export class TabList {
  tabService = inject(TabService);

  @ContentChildren(Tab) tabs!: QueryList<Tab>;
}
