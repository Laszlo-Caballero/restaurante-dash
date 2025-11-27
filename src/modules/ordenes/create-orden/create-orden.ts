import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Modal } from '@/components/ui/modal/modal';
import { Clock, CreditCardIcon, Hamburger, List, LucideAngularModule, X } from 'lucide-angular';
import { HttpService } from '@/services/http/http-service';
import { ComidaResponse, ResponseApi } from '@/interfaces/response.interface';
import { Load } from '@/components/ui/load/load';
import { AuthService } from '@/services/auth/auth-service';
import { SelectedComida } from './interfaces/orden.interface';
import { MenuCounter } from '@/components/ui/menu-counter/menu-counter';
import { Button } from '@/components/ui/button/button';
import { toast } from 'ngx-sonner';
import { ResponseOrden } from '@/interfaces/ordenes.interface';
import { WebsocketService } from '@/services/websocket/websocket-service';
import { Tabs } from '@/components/ui/tabs/tabs';
import { TabHeader } from '@/components/ui/tab-header/tab-header';
import { TabButton } from '@/components/ui/tab-button/tab-button';
import { TabList } from '@/components/ui/tab-list/tab-list';
import { Tab } from '@/components/ui/tab/tab';
import { EstadoOrden } from '@/enum/EstadoOrden';
import { DetallePedido } from '@/components/shared/detalle-pedido/detalle-pedido';

@Component({
  selector: 'app-create-orden',
  imports: [
    Modal,
    LucideAngularModule,
    Load,
    MenuCounter,
    Button,
    Tabs,
    TabHeader,
    TabButton,
    TabList,
    Tab,
    DetallePedido,
  ],
  templateUrl: './create-orden.html',
})
export class CreateOrden implements OnInit {
  @Input({ required: true }) onClose!: () => void;
  @Input({ required: true }) mesaId!: number;
  @Input() pedidoId?: number;

  httpService = inject(HttpService);
  authService = inject(AuthService);
  websocketService = inject(WebsocketService);

  comidas = signal<ComidaResponse[]>([]);
  isLoading = signal<boolean>(false);
  selectedComidas = signal<SelectedComida[]>([]);
  ordenDetails = signal<ResponseOrden | undefined>(undefined);

  XIcon = X;
  MenuIcon = Hamburger;
  DetailsIcon = List;

  ngOnInit(): void {
    this.loadComidas();
    this.loadOrden();
  }

  loadComidas() {
    this.isLoading.set(true);
    this.httpService
      .get<ResponseApi<ComidaResponse[]>>('comidas', {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe((data) => {
        this.comidas.set(data.data);
        this.isLoading.set(false);
      });
  }

  loadOrden() {
    if (!this.pedidoId) return;
    this.isLoading.set(true);
    this.httpService
      .get<ResponseApi<ResponseOrden>>(`pedidos/detalle/${this.pedidoId}`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: (value) => {
          this.ordenDetails.set(value.data);
        },
        error: () => {
          toast.error('Error al cargar los detalles de la orden.');
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  onCreateOrden() {
    if (this.selectedComidas().length === 0) {
      toast.error('Debe seleccionar al menos una comida para crear la orden.');
      return;
    }

    const body = {
      mesaId: this.mesaId,
      comidas: this.selectedComidas(),
    };

    this.isLoading.set(true);
    this.httpService
      .post<ResponseApi<ResponseOrden>>('pedidos', body, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: ({ data }) => {
          this.isLoading.set(false);
          toast.success('Orden creada con éxito.');
          const bodyMessage = {
            ordenId: data.pedidoId,
            mesa: data.mesa,
            comidas: data.comidas.map((c) => ({
              comida: c.comida,
              cantidad: c.cantidad,
            })),
            estado: EstadoOrden.PENDIENTE,
          };
          this.websocketService.sendMessage('/app/ordenes', bodyMessage);
          this.onClose();
        },
      });
  }

  getComidaCount = (comidaId: number) => {
    const selected = this.selectedComidas().find((s) => s.comidaId === comidaId);
    return selected ? selected.cantidad : 0;
  };

  increaseCount = (comidaId: number) => {
    const selected = this.selectedComidas().find((s) => s.comidaId === comidaId);
    if (selected) {
      selected.cantidad++;
    } else {
      this.selectedComidas.set([...this.selectedComidas(), { comidaId, cantidad: 1 }]);
    }
  };
  decreaseCount = (comidaId: number) => {
    const selected = this.selectedComidas().find((s) => s.comidaId === comidaId);
    if (selected) {
      selected.cantidad--;
      if (selected.cantidad <= 0) {
        this.selectedComidas.set(this.selectedComidas().filter((s) => s.comidaId !== comidaId));
      }
    }
  };
}
