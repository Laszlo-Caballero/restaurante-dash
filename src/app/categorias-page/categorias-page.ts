import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { Title } from '../../components/ui/title/title';
import { Tooltip } from '../../components/ui/tooltip/tooltip';
import { PositionTooltip } from '../../components/ui/tooltip/enum';
import { Button } from '../../components/ui/button/button';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { HttpService } from '../../services/http/http-service';
import { ResponseApi, ResponseCategoria } from '../../interfaces/response.interface';
import { toast } from 'ngx-sonner';
import { Load } from '../../components/ui/load/load';
import { CardCategory } from '../../components/ui/card-category/card-category';

@Component({
  selector: 'app-categorias-page',
  imports: [Title, Tooltip, Button, LucideAngularModule, Load, CardCategory],
  templateUrl: './categorias-page.html',
})
export class CategoriasPage implements OnInit {
  authService = inject(AuthService);
  httpService = inject(HttpService);

  categories: ResponseCategoria[] = [];
  isLoading = false;
  isError = false;

  PositionTooltip = PositionTooltip;
  PlusIcon = Plus;

  ngOnInit(): void {
    this.loadCategories();
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
