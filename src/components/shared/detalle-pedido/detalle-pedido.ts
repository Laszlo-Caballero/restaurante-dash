import { ResponseOrden } from '@/interfaces/ordenes.interface';
import { Component, Input } from '@angular/core';
import { InputComponent } from '@/components/ui/input/input';
import { Bagde } from '@/components/ui/bagde/bagde';
import { Clock, CreditCardIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-detalle-pedido',
  imports: [InputComponent, Bagde, LucideAngularModule],
  templateUrl: './detalle-pedido.html',
})
export class DetallePedido {
  @Input() detalle?: ResponseOrden;

  CardIcon = CreditCardIcon;
  EstadoIcon = Clock;

  getFechaFormateada(): string {
    if (!this.detalle) {
      return '';
    }

    const fecha = new Date(this.detalle.fechaCreacion);
    return fecha.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
