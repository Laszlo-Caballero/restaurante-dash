import { Component, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@/components/ui/title/title';
import { Table } from '@/components/ui/table/table';
import { Load } from '@/components/ui/load/load';
import { HttpService } from '@/services/http/http-service';
import { AuthService } from '@/services/auth/auth-service';
import { ResponseOrden } from '@/interfaces/ordenes.interface';
import { ColumnDef } from '@/interfaces/table.interface';
import { ResponseApi } from '@/interfaces/response.interface';
import { toast } from 'ngx-sonner';
import { parseDate } from '@/utils/parseDate';
import { DetailsPedidos } from '@/modules/ordenes/details-pedidos/details-pedidos';
import { Button } from '@/components/ui/button/button';
import { Eye, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-pedidos-page',
  imports: [Title, Table, Load, DetailsPedidos, Button, LucideAngularModule],
  templateUrl: './pedidos-page.html',
})
export class PedidosPage implements OnInit {
  httpService = inject(HttpService);
  authService = inject(AuthService);

  @ViewChild('actions', { static: true }) actionsTemplate!: TemplateRef<any>;

  pedidos = signal<ResponseOrden[]>([]);
  isLoading = signal(false);
  isOpenDetailsModal = signal(false);
  selectedPedido = signal<ResponseOrden | null>(null);

  EyeIcon = Eye;

  columns = signal<ColumnDef<ResponseOrden>[]>([
    {
      header: 'ID Pedido',
      accessorKey: 'pedidoId',
    },
    {
      header: 'Fecha',
      cell: ({ row }) => parseDate(row.fechaCreacion),
    },
    {
      header: 'Mesa',
      cell: ({ row }) => `Mesa ${row.mesa.numeroMesa}`,
    },
    {
      header: 'Total',
      cell: ({ row }) => `$${row.total}`,
    },
    {
      header: 'Estado',
      cell: ({ row }) => `<span class="capitalize">${row.estado.toLowerCase()}</span>`,
    },
    {
      header: 'Método de Pago',
      accessorKey: 'metodoPago',
    },
  ]);

  ngOnInit() {
    this.loadPedidos();
    this.columns.set([
      ...this.columns(),
      {
        header: 'Acciones',
        cellTemplate: this.actionsTemplate,
      },
    ]);
  }

  loadPedidos() {
    this.isLoading.set(true);
    this.httpService
      .get<ResponseApi<ResponseOrden[]>>('pedidos', {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: (response) => {
          this.pedidos.set(response.data);
        },
        error: () => {
          toast.error('Error al cargar los pedidos');
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  openDetailsModal(pedido: ResponseOrden) {
    this.selectedPedido.set(pedido);
    this.isOpenDetailsModal.set(true);
  }

  closeDetailsModal = () => {
    this.isOpenDetailsModal.set(false);
    this.selectedPedido.set(null);
  };
}
