import { Component, inject, Input, signal } from '@angular/core';
import { Modal } from '@/components/ui/modal/modal';
import { LucideAngularModule, X } from 'lucide-angular';
import { ResponseOrden } from '@/interfaces/ordenes.interface';
import { Button } from '@/components/ui/button/button';
import { AuthService } from '@/services/auth/auth-service';
import { HttpService } from '@/services/http/http-service';
import { toast } from 'ngx-sonner';
import { Load } from '@/components/ui/load/load';
import { WebsocketService } from '@/services/websocket/websocket-service';

@Component({
  selector: 'app-cancel-orden',
  imports: [Modal, LucideAngularModule, Button, Load],
  templateUrl: './cancel-orden.html',
})
export class CancelOrden {
  @Input({ required: true }) onCloseModal!: () => void;
  @Input() detalle!: ResponseOrden;

  XIcon = X;

  isLoading = signal(false);

  authService = inject(AuthService);
  httpClient = inject(HttpService);
  webSocket = inject(WebsocketService);

  cancelarPedido() {
    this.isLoading.set(true);
    this.httpClient
      .delete(`pedidos/cancelar/${this.detalle?.pedidoId}`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: () => {
          toast.success('Pedido cancelado con éxito');
          this.isLoading.set(false);
          this.webSocket.sendMessage('/app/limpiar-mesa', this.detalle?.mesa.mesaId);
          this.onCloseModal();
        },
        error: () => {
          toast.error('Error al cancelar el pedido');
          this.isLoading.set(false);
        },
      });
  }
}
