import { Component, inject, Input, OnInit } from '@angular/core';
import { Modal } from '../../ui/modal/modal';
import { Image, LucideAngularModule, X } from 'lucide-angular';
import { Tabs } from '../../ui/tabs/tabs';
import { TabHeader } from '../../ui/tab-header/tab-header';
import { TabButton } from '../../ui/tab-button/tab-button';
import { TabList } from '../../ui/tab-list/tab-list';
import { Tab } from '../../ui/tab/tab';
import { ResponseApi, ResponseRecurso } from '../../../interfaces/response.interface';
import { HttpService } from '../../../services/http/http-service';
import { AuthService } from '../../../services/auth/auth-service';
import { Load } from '../../ui/load/load';
import { CardImage } from '../../ui/card-image/card-image';

@Component({
  selector: 'app-galery-modal',
  imports: [Modal, LucideAngularModule, Tabs, TabHeader, TabButton, TabList, Tab, Load, CardImage],
  templateUrl: './galery-modal.html',
})
export class GaleryModal implements OnInit {
  httpService = inject(HttpService);
  authService = inject(AuthService);

  recursos: ResponseRecurso[] = [];
  isLoading = false;
  isError = false;

  @Input({ required: true }) onClose!: () => void;

  XIcon = X;
  PhotoIcon = Image;

  onCloseHandler() {
    this.onClose();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.httpService
      .get<ResponseApi<ResponseRecurso[]>>('recursos', {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: (response) => {
          this.recursos = response.data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading recursos', err);
          this.isError = true;
          this.isLoading = false;
        },
      });
  }
}
