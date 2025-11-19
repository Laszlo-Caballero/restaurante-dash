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
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputError } from '../../interfaces/input.interface';

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
    ReactiveFormsModule,
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

  categoriaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  nombreErrors: InputError[] = [
    {
      type: 'required',
      message: 'El nombre de la categoría es obligatorio.',
    },
  ];

  descripcionErrors: InputError[] = [
    {
      type: 'required',
      message: 'La descripción de la categoría es obligatoria.',
    },
    {
      type: 'minlength',
      message: 'La descripción debe tener al menos 10 caracteres.',
    },
  ];

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

  onSubmitCategory() {
    if (this.categoriaForm.invalid) {
      toast.error('Por favor, complete el formulario correctamente');
      return;
    }
    const { nombre, descripcion } = this.categoriaForm.value;

    if (this.selectedImage.recursoId === -1 && !this.selectedImage.file) {
      toast.error('Debe seleccionar una imagen para la categoría');
      return;
    }

    this.isLoading = true;

    const recursoId = this.selectedImage.recursoId;

    if (this.selectedImage.file) {
      const formData = new FormData();
      formData.append('file', this.selectedImage.file);
      this.httpService
        .post<{ recursoId: number }>('recursos', formData, {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        })
        .subscribe({
          next: (response) => {
            const recursoId = response.recursoId;
            this.createCategory(nombre!, descripcion!, recursoId);
          },
          error: () => {
            this.isLoading = false;
            toast.error('Error al subir la imagen');
          },
        });
    } else {
      this.createCategory(nombre!, descripcion!, recursoId);
    }
  }

  private createCategory(nombre: string, descripcion: string, recursoId: number) {
    this.httpService
      .post<ResponseApi<ResponseCategoria>>(
        'categorias',
        {
          nombre,
          descripcion,
          recursoId,
        },
        {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        }
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.onCloseModal();
          toast.success('Categoría creada exitosamente');
          this.loadCategories();
        },
        error: () => {
          this.isLoading = false;
          toast.error('Error al crear la categoría');
        },
      });
  }

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
