import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Title } from '../../components/ui/title/title';
import { LucideAngularModule, Upload } from 'lucide-angular';
import { Load } from '../../components/ui/load/load';
import { HttpService } from '../../services/http/http-service';
import { ResponseApi, ResponseRecurso } from '../../interfaces/response.interface';
import { AuthService } from '../../services/auth/auth-service';
import { CardImage } from '../../components/ui/card-image/card-image';
import { DropService } from '../../services/drop/drop-service';
import { Button } from '../../components/ui/button/button';
import { Modal } from '../../components/ui/modal/modal';

@Component({
  selector: 'app-galeria-page',
  imports: [Title, LucideAngularModule, Load, CardImage, Button, Modal],
  templateUrl: './galeria-page.html',
})
export class GaleriaPage implements OnInit {
  UploadIcon = Upload;
  isLoading = false;
  isError = false;
  isOpenModal = false;
  httpService = inject(HttpService);
  recursos: ResponseRecurso[] = [];
  file: File | null = null;
  authService = inject(AuthService);
  dropService = inject(DropService);
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
  }

  onClickInputFile() {
    this.fileInput?.nativeElement?.click();
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
