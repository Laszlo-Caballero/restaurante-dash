import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@/services/auth/auth-service';
import { Title } from '@/components/ui/title/title';
import { Tooltip } from '@/components/ui/tooltip/tooltip';
import { PositionTooltip } from '@/components/ui/tooltip/enum';
import { Button } from '@/components/ui/button/button';
import { LucideAngularModule, Plus, Upload, X } from 'lucide-angular';
import { HttpService } from '@/services/http/http-service';
import { ResponseApi, ResponseCategoria } from '@/interfaces/response.interface';
import { toast } from 'ngx-sonner';
import { Load } from '@/components/ui/load/load';
import { CardCategory } from '@/components/ui/card-category/card-category';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCategoria } from '@/modules/categorias/create-categoria/create-categoria';
import { UpdateCategoria } from '@/modules/categorias/update-categoria/update-categoria';
import { DeleteCategory } from '@/modules/categorias/delete-category/delete-category';

@Component({
  selector: 'app-categorias-page',
  imports: [
    Title,
    Tooltip,
    Button,
    LucideAngularModule,
    Load,
    CardCategory,
    ReactiveFormsModule,
    CreateCategoria,
    UpdateCategoria,
    DeleteCategory,
  ],
  templateUrl: './categorias-page.html',
})
export class CategoriasPage implements OnInit {
  authService = inject(AuthService);
  httpService = inject(HttpService);

  categories: ResponseCategoria[] = [];
  isLoading = false;
  isError = false;
  isOpenModal = false;
  isOpenEdit = false;
  isOpenDelete = false;
  selectedCategoryId: number | null = null;
  findCategory: ResponseCategoria | undefined = undefined;

  PositionTooltip = PositionTooltip;
  PlusIcon = Plus;

  ngOnInit(): void {
    this.loadCategories();
  }

  openCreateCategoryModal() {
    this.isOpenModal = true;
  }

  onCloseModal = () => {
    this.isOpenModal = false;
    this.loadCategories();
  };

  openEditModal = (categoryId: number) => {
    this.isOpenEdit = true;
    this.selectedCategoryId = categoryId;
  };

  openDeleteModal = (categoryId: number) => {
    const category = this.categories.find((cat) => cat.id === categoryId);
    if (!category) {
      toast.error('Categoría no encontrada');
      return;
    }
    this.findCategory = category;
    this.isOpenDelete = true;
  };

  closeEditModal = () => {
    this.isOpenEdit = false;
    this.selectedCategoryId = null;
    this.loadCategories();
  };

  closeDeleteModal = () => {
    this.isOpenDelete = false;
    this.findCategory = undefined;
    this.loadCategories();
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
