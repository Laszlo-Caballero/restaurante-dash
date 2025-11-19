import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  currentTab: number = 0;

  setTab(index: number) {
    this.currentTab = index;
  }
}
