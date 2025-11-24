import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Modal } from '@/components/ui/modal/modal';
import { LucideAngularModule, X } from 'lucide-angular';
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

@Component({
  selector: 'app-create-orden',
  imports: [Modal, LucideAngularModule, Load, MenuCounter, Button],
  templateUrl: './create-orden.html',
})
export class CreateOrden implements OnInit {
  @Input({ required: true }) onClose!: () => void;
  @Input({ required: true }) mesaId!: number;

  httpService = inject(HttpService);
  authService = inject(AuthService);
  websocketService = inject(WebsocketService);

  comidas = signal<ComidaResponse[]>([]);
  isLoading = signal<boolean>(false);
  selectedComidas = signal<SelectedComida[]>([]);

  XIcon = X;

  ngOnInit(): void {
    this.loadComidas();
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
            mesa: data.mesa,
            comidas: data.comidas.map((c) => c.comida),
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
