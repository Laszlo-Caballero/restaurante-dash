import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Title } from '@/components/ui/title/title';
import { Image, LucideAngularModule, Send, Upload, X } from 'lucide-angular';
import { Load } from '@/components/ui/load/load';
import { HttpService } from '@/services/http/http-service';
import { ResponseApi, ResponseRecurso } from '@/interfaces/response.interface';
import { AuthService } from '@/services/auth/auth-service';
import { CardImage } from '@/components/ui/card-image/card-image';
import { DropService } from '@/services/drop/drop-service';
import { Button } from '@/components/ui/button/button';
import { Modal } from '@/components/ui/modal/modal';
import { cx } from '@/utils/cx';
import { toast } from 'ngx-sonner';
import { Tooltip } from '@/components/ui/tooltip/tooltip';
import { PositionTooltip } from '@/components/ui/tooltip/enum';

@Component({
  selector: 'app-galeria-page',
  imports: [Title, LucideAngularModule, Load, CardImage, Button, Modal, Tooltip],
  templateUrl: './galeria-page.html',
})
export class GaleriaPage implements OnInit {
  UploadIcon = Upload;
  XIcon = X;
  PhotoIcon = Image;
  SendIcon = Send;

  isLoading = false;
  isError = false;
  isOpenModal = false;

  recursos: ResponseRecurso[] = [];
  file: File | null = null;

  httpService = inject(HttpService);
  authService = inject(AuthService);
  dropService = inject(DropService);
  cx = cx;
  PositionTooltip = PositionTooltip;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.loadData();
    this.dropService.setOnDropCallback((f) => {
      console.log('Files dropped', f);
      const firstFile = f[0];
      this.file = firstFile;
    });
  }

  onOpenModal() {
    this.isOpenModal = true;
  }

  onCloseModal() {
    this.isOpenModal = false;
    this.file = null;
  }

  onClickInputFile() {
    this.fileInput?.nativeElement?.click();
  }

  getFileUrl() {
    return URL.createObjectURL(this.file!);
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

  onUploadFile() {
    if (!this.file) return;

    const formData = new FormData();
    formData.append('file', this.file);

    this.isLoading = true;
    this.httpService
      .post('recursos', formData, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.isOpenModal = false;
          this.file = null;
          toast.success('Imagen subida con éxito.');
          this.loadData();
        },
        error: () => {
          toast.error('Error al subir la imagen. Inténtalo de nuevo.');
          this.isLoading = false;
          this.isError = true;
        },
      });
  }
}
