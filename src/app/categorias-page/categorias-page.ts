import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { Title } from '../../components/ui/title/title';
import { Tooltip } from '../../components/ui/tooltip/tooltip';
import { PositionTooltip } from '../../components/ui/tooltip/enum';
import { Button } from '../../components/ui/button/button';
import { LucideAngularModule, Plus, Upload, X } from 'lucide-angular';
import { HttpService } from '../../services/http/http-service';
import { ResponseApi, ResponseCategoria } from '../../interfaces/response.interface';
import { toast } from 'ngx-sonner';
import { Load } from '../../components/ui/load/load';
import { CardCategory } from '../../components/ui/card-category/card-category';
import { Modal } from '../../components/ui/modal/modal';
import { InputComponent } from '../../components/ui/input/input';
import { TextArea } from '../../components/ui/text-area/text-area';
import { GaleryModal } from '../../components/shared/galery-modal/galery-modal';
import { GaleryModalValue } from '../../components/shared/galery-modal/value.interface';

@Component({
  selector: 'app-categorias-page',
  imports: [
    Title,
    Tooltip,
    Button,
    LucideAngularModule,
    Load,
    CardCategory,
    Modal,
    InputComponent,
    TextArea,
    GaleryModal,
  ],
  templateUrl: './categorias-page.html',
})
export class CategoriasPage implements OnInit {
  authService = inject(AuthService);
  httpService = inject(HttpService);

  private imageUrl = 'http://localhost:8080/images';

  categories: ResponseCategoria[] = [];
  isLoading = false;
  isError = false;
  isOpenModal = false;
  isGaleryModalOpen = false;

  PositionTooltip = PositionTooltip;
  PlusIcon = Plus;
  XIcon = X;
  UploadIcon = Upload;

  selectedImage: GaleryModalValue = {
    recursoId: -1,
  };

  ngOnInit(): void {
    this.loadCategories();
  }

  openCreateCategoryModal() {
    this.isOpenModal = true;
  }

  onCloseModal = () => {
    this.isOpenModal = false;
    this.selectedImage = { recursoId: -1 };
  };

  openGaleryModal() {
    this.isGaleryModalOpen = true;
  }

  onCloseGaleryModal = () => {
    this.isGaleryModalOpen = false;
  };

  getImageUrl() {
    return `${this.imageUrl}/${this.selectedImage.nombre}`;
  }

  getFileUrl() {
    return URL.createObjectURL(this.selectedImage.file!);
  }

  onSelectImage = (value: GaleryModalValue) => {
    this.selectedImage = value;
  };

  loadCategories() {
    this.isLoading = true;

    this.httpService
      .get<ResponseApi<ResponseCategoria[]>>('categorias', {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: (response) => {
          this.categories = response.data;
          this.isLoading = false;
        },
        error: () => {
          this.isError = true;
          toast.error('Error al cargar las categorías');
        },
      });
  }
}
