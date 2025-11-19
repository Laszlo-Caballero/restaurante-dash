import { Component, Input } from '@angular/core';
import { Modal } from '../../ui/modal/modal';
import { Image, LucideAngularModule, X } from 'lucide-angular';
import { Tabs } from '../../ui/tabs/tabs';
import { TabHeader } from '../../ui/tab-header/tab-header';
import { TabButton } from '../../ui/tab-button/tab-button';
import { TabList } from '../../ui/tab-list/tab-list';
import { Tab } from '../../ui/tab/tab';

@Component({
  selector: 'app-galery-modal',
  imports: [Modal, LucideAngularModule, Tabs, TabHeader, TabButton, TabList, Tab],
  templateUrl: './galery-modal.html',
})
export class GaleryModal {
  @Input({ required: true }) onClose!: () => void;

  XIcon = X;
  PhotoIcon = Image;

  onCloseHandler() {
    this.onClose();
  }
}
