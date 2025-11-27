import { ResponseOrden } from '@/interfaces/ordenes.interface';
import { AuthService } from '@/services/auth/auth-service';
import { HttpService } from '@/services/http/http-service';
import { Component, inject, Input } from '@angular/core';
import { toast } from 'ngx-sonner';
import { Modal } from '@/components/ui/modal/modal';
import { Button } from '@/components/ui/button/button';
import { Load } from '@/components/ui/load/load';
import { Coins, CreditCard, LucideAngularModule, X } from 'lucide-angular';
import { Bagde } from '@/components/ui/bagde/bagde';
import { cx } from '@/utils/cx';

@Component({
  selector: 'app-complete-orden',
  imports: [Modal, Button, Load, LucideAngularModule, Bagde],
  templateUrl: './complete-orden.html',
})
export class CompleteOrden {
  @Input({ required: true }) onClose!: () => void;
  @Input({ required: true }) detalle!: ResponseOrden;

  isLoading = false;
  metodoPago: 'Efectivo' | 'Tarjeta' = 'Efectivo';

  authService = inject(AuthService);
  httpClient = inject(HttpService);

  XIcon = X;
  CoinIcon = Coins;
  TargetIcon = CreditCard;

  cx = cx;

  onChangeMetodoPago(metodo: 'Efectivo' | 'Tarjeta') {
    this.metodoPago = metodo;
  }

  onCompleteOrden() {
    this.isLoading = true;
    this.httpClient
      .put(
        `pedidos/completar/${this.detalle.pedidoId}`,
        { metodoPago: this.metodoPago },
        {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        }
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          toast.success('Orden completada con éxito');
          this.onClose();
        },
        error: () => {
          this.isLoading = false;
          toast.error('Error al completar la orden');
        },
      });
  }
}
