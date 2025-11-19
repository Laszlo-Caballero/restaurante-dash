import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.html',
})
export class Tab {
  @ViewChild(TemplateRef, { static: true }) tabContent!: TemplateRef<any>;
}
