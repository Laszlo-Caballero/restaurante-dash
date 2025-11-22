import { Component, inject, Input } from '@angular/core';
import { Modal } from '../../../components/ui/modal/modal';
import { LucideAngularModule, Upload, X } from 'lucide-angular';
import { InputComponent } from '../../../components/ui/input/input';
import { TextArea } from '../../../components/ui/text-area/text-area';
import { Button } from '../../../components/ui/button/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputError } from '../../../interfaces/input.interface';
import { GaleryModalValue } from '../../../components/shared/galery-modal/value.interface';
import { GaleryModal } from '../../../components/shared/galery-modal/galery-modal';
import { toast } from 'ngx-sonner';
import { HttpService } from '../../../services/http/http-service';
import { AuthService } from '../../../services/auth/auth-service';
import {
  ResponseApi,
  ResponseCategoria,
  ResponseRecurso,
} from '../../../interfaces/response.interface';
import { ENV } from '../../../config/env';

@Component({
  selector: 'app-create-categoria',
  imports: [
    Modal,
    LucideAngularModule,
    InputComponent,
    TextArea,
    Button,
    ReactiveFormsModule,
    GaleryModal,
  ],
  templateUrl: './create-categoria.html',
})
export class CreateCategoria {
  authService = inject(AuthService);
  httpService = inject(HttpService);

  @Input({ required: true }) onCloseModal!: () => void;

  private imageUrl = ENV.imagesUrl;

  isGaleryModalOpen = false;
  isLoading = false;

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

  getImageUrl() {
    return `${this.imageUrl}/${this.selectedImage.nombre}`;
  }

  getFileUrl() {
    return URL.createObjectURL(this.selectedImage.file!);
  }

  onSelectImage = (value: GaleryModalValue) => {
    this.selectedImage = value;
  };

  openGaleryModal() {
    this.isGaleryModalOpen = true;
  }

  onCloseGaleryModal = () => {
    this.isGaleryModalOpen = false;
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
        .post<ResponseApi<ResponseRecurso>>('recursos', formData, {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        })
        .subscribe({
          next: (response) => {
            const recursoId = response.data.recursoId;
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
        },
        error: () => {
          this.isLoading = false;
          toast.error('Error al crear la categoría');
        },
      });
  }
}
