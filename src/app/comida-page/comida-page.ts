import { AfterViewInit, Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '../../components/ui/title/title';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { ComidaResponse, ResponseApi } from '../../interfaces/response.interface';
import { Table } from '../../components/ui/table/table';
import { ColumnDef } from '../../interfaces/table.interface';
import { HttpService } from '../../services/http/http-service';
import { AuthService } from '../../services/auth/auth-service';
import { toast } from 'ngx-sonner';
import { Load } from '../../components/ui/load/load';
import { ENV } from '../../config/env';

@Component({
  selector: 'app-comida-page',
  imports: [LucideAngularModule, Title, RouterLink, Table, Load],
  templateUrl: './comida-page.html',
})
export class ComidaPage implements OnInit {
  httpService = inject(HttpService);
  authService = inject(AuthService);
  router = inject(Router);

  @ViewChild('actions', { static: true }) accionesTemplate!: TemplateRef<any>;

  readonly PlusIcon = Plus;

  data: ComidaResponse[] = [];

  isLoading = false;

  columns: ColumnDef<ComidaResponse>[] = [
    {
      header: 'Imagen',
      cell({ row }) {
        return `<img src="${ENV.imagesUrl}/${row.recurso.nombre}" alt="${row.nombre}" class="w-12 h-12 object-cover rounded-lg"/>`;
      },
    },
    {
      header: 'Nombre',
      accessorKey: 'nombre',
    },
    {
      header: 'Precio',
      cell({ row }) {
        return `<span class="text-gray-500 font-semibold text-lg">$${row.precio.toFixed(2)}</span>`;
      },
    },
    {
      header: 'Disponible',
      cell({ row }) {
        return `<span class="py-1 px-2 border border-gray-300 rounded-xl font-semibold">${
          row.disponible ? 'Activo' : 'Desactivado'
        }</span>`;
      },
    },
    {
      header: 'Cantidad de Pedidos',
      accessorKey: 'cantidadPedidos',
    },
    {
      header: 'Ventas Totales',
      accessorKey: 'ventasTotales',
    },
    {
      header: 'Categorías',
      cell({ row }) {
        return `<span class="text-gray-600 font-medium">${row.categorias
          .map((cat) => cat.nombre)
          .join(', ')}</span>`;
      },
    },
  ];

  ngOnInit() {
    this.loadComidas();
    this.columns.push({
      header: 'Acciones',
      cellTemplate: this.accionesTemplate,
    });
  }

  loadComidas() {
    this.isLoading = true;
    this.httpService
      .get<ResponseApi<ComidaResponse[]>>('comidas', {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: (value) => {
          this.data = value.data;
        },
        error: () => {
          toast.error('Error al cargar las comidas');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
