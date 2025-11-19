import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Modal } from '../../ui/modal/modal';
import { Image, LucideAngularModule, Upload, X } from 'lucide-angular';
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
import { GaleryModalValue } from './value.interface';
import { DropService } from '../../../services/drop/drop-service';
import { cx } from '../../../utils/cx';
import { Button } from '../../ui/button/button';

@Component({
  selector: 'app-galery-modal',
  imports: [
    Modal,
    LucideAngularModule,
    Tabs,
    TabHeader,
    TabButton,
    TabList,
    Tab,
    Load,
    CardImage,
    Button,
  ],
  templateUrl: './galery-modal.html',
})
export class GaleryModal implements OnInit {
  httpService = inject(HttpService);
  authService = inject(AuthService);
  dropService = inject(DropService);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Input({ required: true }) onSelect!: (value: GaleryModalValue) => void;
  @Input({ required: true }) selectedImage!: GaleryModalValue;
  @Input({ required: true }) onClose!: () => void;

  recursos: ResponseRecurso[] = [];
  isLoading = false;
  isError = false;

  UploadIcon = Upload;

  cx = cx;

  onClickInputFile() {
    this.fileInput?.nativeElement?.click();
  }

  getFileUrl() {
    return URL.createObjectURL(this.selectedImage.file!);
  }

  onSelectImage(recursoId: number, nombre?: string) {
    this.selectedImage = {
      recursoId,
      nombre,
      file: undefined,
    };
  }

  XIcon = X;
  PhotoIcon = Image;

  onCloseHandler() {
    this.onClose();
  }

  onSubmit() {
    this.onSelect(this.selectedImage);
    this.onClose();
  }

  ngOnInit(): void {
    this.loadData();
    this.dropService.setOnDropCallback((files) => {
      const firstFile = files[0];
      this.selectedImage = {
        recursoId: -1,
        nombre: '',
        file: firstFile,
      };
    });
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
