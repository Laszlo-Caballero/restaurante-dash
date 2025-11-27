import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AuthService } from '@/services/auth/auth-service';
import { Title } from '@/components/ui/title/title';
import { Card } from '@/components/ui/card/card';
import { ComidaResponse, ResponseApi, ResponseDashboard } from '@/interfaces/response.interface';
import { HttpService } from '@/services/http/http-service';
import { toast } from 'ngx-sonner';
import { Load } from '@/components/ui/load/load';
import { WebsocketService } from '@/services/websocket/websocket-service';
import { ComidaOrden, MesasOrdenesMessage } from '@/interfaces/ordenes.interface';
import { EstadoOrden } from '@/enum/EstadoOrden';
import { Details } from '@/components/ui/details/details';
import { LucideAngularModule, Utensils } from 'lucide-angular';
import { Table } from '@/components/ui/table/table';
import { Router, RouterLink } from '@angular/router';
import { ColumnDef } from '@/interfaces/table.interface';
import { ENV } from '@/config/env';

@Component({
  selector: 'app-home-page',
  imports: [Title, Card, Load, Details, RouterLink, LucideAngularModule, Table],
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit, OnDestroy {
  authService = inject(AuthService);
  httpService = inject(HttpService);
  websocketService = inject(WebsocketService);
  router = inject(Router);

  mesas = signal(0);

  isLoading = signal(false);
  dashboardData = signal<ResponseDashboard | undefined>(undefined);

  @ViewChild('actions', { static: true }) accionesTemplate!: TemplateRef<any>;

  UtensilsIcon = Utensils;

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
    this.websocketService.connect({
      subscribes: [
        {
          destination: '/topic/todas-las-ordenes',
          callback: (msg: MesasOrdenesMessage[]) => {
            const occupiedMesas = msg.filter(
              ({ estado }) => estado != EstadoOrden.EN_ESPERA
            ).length;

            this.mesas.set(occupiedMesas);
          },
        },
        {
          destination: '/topic/ordenes',
          callback: (msg: MesasOrdenesMessage[]) => {
            const occupiedMesas = msg.filter(
              ({ estado }) => estado != EstadoOrden.EN_ESPERA
            ).length;

            this.mesas.set(occupiedMesas);
          },
        },
      ],
      onConnectCallback: () => {
        this.websocketService.sendMessage('/app/todas-las-ordenes', {});
      },
    });
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }

  loadDashboardData() {
    this.isLoading.set(true);
    this.httpService
      .get<ResponseApi<ResponseDashboard>>('inicio/detalles', {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: (data) => {
          this.dashboardData.set(data.data);
          this.isLoading.set(false);
          toast.success('Datos del dashboard cargados correctamente');
        },
        error: () => {
          this.isLoading.set(false);
          toast.error('Error al cargar los datos del dashboard');
        },
      });
  }

  parseComidas(comidas: ComidaOrden[]) {
    return (
      comidas
        .slice(0, 2)
        .map((comida) => `${comida.cantidad}x ${comida.comida.nombre}`)
        .join(', ') + (comidas.length > 2 ? ', ...' : '')
    );
  }
}
