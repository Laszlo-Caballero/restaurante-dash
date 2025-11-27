import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@/components/ui/title/title';
import { Button } from '@/components/ui/button/button';
import { Router } from '@angular/router';
import { InputComponent } from '@/components/ui/input/input';
import { TextArea } from '@/components/ui/text-area/text-area';
import { Checkbox } from '@/components/ui/checkbox/checkbox';
import { HttpService } from '@/services/http/http-service';
import { AuthService } from '@/services/auth/auth-service';
import { ResponseApi, ResponseCategoria, ResponseRecurso } from '@/interfaces/response.interface';
import { Load } from '@/components/ui/load/load';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { cx } from '@/utils/cx';
import { GaleryModalValue } from '@/components/shared/galery-modal/value.interface';
import { LucideAngularModule, Upload } from 'lucide-angular';
import { GaleryModal } from '@/components/shared/galery-modal/galery-modal';
import { toast } from 'ngx-sonner';
import { ENV } from '@/config/env';

@Component({
  selector: 'app-crear-comida',
  imports: [
    Title,
    Button,
    InputComponent,
    TextArea,
    Checkbox,
    Load,
    ReactiveFormsModule,
    LucideAngularModule,
    GaleryModal,
  ],
  templateUrl: './crear-comida.html',
})
export class CrearComida implements OnInit {
  private router = inject(Router);
  private httpClient = inject(HttpService);
  private authService = inject(AuthService);
  private imageUrl = ENV.imagesUrl;
  cx = cx;

  comidaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(1)]),
    precio: new FormControl('', [Validators.required, Validators.min(0)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(1)]),
    disponible: new FormControl(false),
    categoriaIds: new FormControl<Array<number>>([], [Validators.required]),
  });

  isLoading = false;
  isGaleryModalOpen = false;
  categories: ResponseCategoria[] = [];

  UploadIcon = Upload;

  selectedImage: GaleryModalValue = {
    recursoId: -1,
  };

  backTo() {
    this.router.navigate(['/comidas']);
  }

  ngOnInit() {
    this.loadCategories();
  }

  onSubmit() {
    if (this.comidaForm.invalid) {
      toast.error('Por favor, completa el formulario correctamente');
      return;
    }

    if (this.selectedImage.recursoId === -1 && !this.selectedImage.file) {
      toast.error('Por favor, selecciona una imagen para la comida');
      return;
    }

    this.isLoading = true;

    const recursoId = this.selectedImage.recursoId;

    if (this.selectedImage.file) {
      const formData = new FormData();
      formData.append('file', this.selectedImage.file);
      this.httpClient
        .post<ResponseApi<ResponseRecurso>>('recursos', formData, {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        })
        .subscribe({
          next: (response) => {
            const recursoId = response.data.recursoId;
            this.createComida(this.comidaForm.value, recursoId);
          },
          error: () => {
            this.isLoading = false;
            toast.error('Error al subir la imagen');
          },
        });
    } else {
      this.createComida(this.comidaForm.value, recursoId);
    }
  }

  createComida(comidaData: typeof this.comidaForm.value, recursoId: number) {
    this.httpClient
      .post(
        'comidas',
        {
          ...comidaData,
          recursoId: recursoId,
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
          toast.success('Comida creada con éxito');
        },
        error: () => {
          toast.error('Error al crear la comida');
        },
        complete: () => {
          this.router.navigate(['/comidas']);
        },
      });
  }

  pushCategoriaId(id: number) {
    const currentIds = this.comidaForm.get('categoriaIds')?.value || [];
    if (!currentIds.includes(id)) {
      this.comidaForm.get('categoriaIds')?.setValue([...currentIds, id]);
    } else {
      this.comidaForm.get('categoriaIds')?.setValue(currentIds.filter((cid) => cid !== id));
    }
  }

  isCategoriaSelected(id: number): boolean {
    const currentIds = this.comidaForm.get('categoriaIds')?.value || [];
    return currentIds.includes(id);
  }

  onChangeSelect = () => {
    this.comidaForm.get('disponible')?.setValue(!this.comidaForm.get('disponible')?.value);
  };

  loadCategories() {
    this.isLoading = true;
    this.httpClient
      .get<ResponseApi<ResponseCategoria[]>>('categorias?estado=true', {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: (response) => {
          this.categories = response.data;
        },
        error: (error) => {
          console.error('Error loading categories:', error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

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
}
