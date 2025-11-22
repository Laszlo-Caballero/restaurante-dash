import { Component, inject, Input, OnInit } from '@angular/core';
import { AuthService } from '@/services/auth/auth-service';
import { HttpService } from '@/services/http/http-service';
import { Upload, X, LucideAngularModule } from 'lucide-angular';
import { GaleryModalValue } from '@/components/shared/galery-modal/value.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputError } from '@/interfaces/input.interface';
import { ResponseApi, ResponseCategoria, ResponseRecurso } from '@/interfaces/response.interface';
import { GaleryModal } from '@/components/shared/galery-modal/galery-modal';
import { Button } from '@/components/ui/button/button';
import { Modal } from '@/components/ui/modal/modal';
import { InputComponent } from '@/components/ui/input/input';
import { TextArea } from '@/components/ui/text-area/text-area';
import { Load } from '@/components/ui/load/load';
import { toast } from 'ngx-sonner';
import { ENV } from '@/config/env';

@Component({
  selector: 'app-update-categoria',
  imports: [
    ReactiveFormsModule,
    GaleryModal,
    Button,
    Modal,
    LucideAngularModule,
    InputComponent,
    TextArea,
    Load,
  ],
  templateUrl: './update-categoria.html',
})
export class UpdateCategoria implements OnInit {
  authService = inject(AuthService);
  httpService = inject(HttpService);

  @Input({ required: true }) onCloseModal!: () => void;
  @Input({ required: true }) categoriaId!: number;

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

  ngOnInit(): void {
    this.loadCategoriaData();
  }

  loadCategoriaData() {
    this.isLoading = true;

    this.httpService
      .get<ResponseApi<ResponseCategoria>>(`categorias/${this.categoriaId}`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: (response) => {
          this.categoriaForm.setValue({
            nombre: response.data.nombre,
            descripcion: response.data.descripcion,
          });
          this.selectedImage = {
            recursoId: response.data.recurso.recursoId,
            nombre: response.data.recurso.nombre,
          };
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

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
            this.updateCategoria(nombre!, descripcion!, recursoId);
          },
          error: () => {
            this.isLoading = false;
            toast.error('Error al subir la imagen');
          },
        });
    } else {
      this.updateCategoria(nombre!, descripcion!, recursoId);
    }
  }

  private updateCategoria(nombre: string, descripcion: string, recursoId: number) {
    this.httpService
      .put<ResponseApi<ResponseCategoria>>(
        `categorias/${this.categoriaId}`,
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
          toast.success('Categoría actualizada exitosamente');
        },
        error: () => {
          this.isLoading = false;
          toast.error('Error al actualizar la categoría');
        },
      });
  }

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
}
