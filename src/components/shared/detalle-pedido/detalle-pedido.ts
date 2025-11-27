import { ResponseOrden } from '@/interfaces/ordenes.interface';
import { Component, ElementRef, inject, Input, signal, ViewChild } from '@angular/core';
import { InputComponent } from '@/components/ui/input/input';
import { Bagde } from '@/components/ui/bagde/bagde';
import { Check, Clock, CreditCardIcon, LucideAngularModule, Printer } from 'lucide-angular';
import { cx } from '@/utils/cx';
import { Button } from '@/components/ui/button/button';
import { AuthService } from '@/services/auth/auth-service';
import { HttpService } from '@/services/http/http-service';
import { toast } from 'ngx-sonner';
import { EstadoPedido, PedidoEnum } from '@/enum/EstadoPedido';

@Component({
  selector: 'app-detalle-pedido',
  imports: [InputComponent, Bagde, LucideAngularModule, Button],
  templateUrl: './detalle-pedido.html',
})
export class DetallePedido {
  @Input() detalle?: ResponseOrden;
  @Input() className?: string = '';
  @Input() relaodDetalle?: () => void;

  CardIcon = CreditCardIcon;
  EstadoIcon = Clock;
  PrinterIcon = Printer;
  CheckIcon = Check;

  isLoading = signal(false);

  @ViewChild('printSection') printSection!: ElementRef<HTMLDivElement>;

  authService = inject(AuthService);
  httpClient = inject(HttpService);

  cx = cx;

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

  getTailwindStyles() {
    const styles = Array.from(document.styleSheets)
      .filter((sheet) => !sheet.href || sheet.href.includes('styles')) // filtra tu CSS
      .map((sheet) => {
        try {
          return Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join('\n');
        } catch {
          return '';
        }
      })
      .join('\n');

    return styles;
  }

  printDetalle() {
    const content = this.printSection.nativeElement.cloneNode(true) as HTMLElement;

    // Sustituir los inputs por su valor
    content.querySelectorAll('input').forEach((input: any) => {
      const span = document.createElement('span');
      span.textContent = input.value || '';
      span.className = input.className; // conserva estilos (incluye Tailwind)
      input.replaceWith(span);
    });

    content.querySelectorAll('textarea').forEach((textarea: any) => {
      const span = document.createElement('span');
      span.textContent = textarea.value || '';
      span.className = textarea.className;
      textarea.replaceWith(span);
    });
    const styles = this.getTailwindStyles();
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow!.document;
    doc.open();

    doc.write(`
    <html>
      <head>
        <title>Detalle del Pedido</title>
        <style>${styles}</style>
      </head>
      <body>
        ${content.innerHTML}
      </body>
    </html>
  `);

    doc.close();
    iframe.onload = () => {
      iframe.contentWindow!.focus();
      iframe.contentWindow!.print();
      document.body.removeChild(iframe); // eliminar iframe luego
    };
  }

  onChangeEstado(pedidoComidaId: string | number, nuevoEstado: keyof typeof EstadoPedido) {
    if (this.detalle?.estado === PedidoEnum.CANCELADO) {
      toast.error('No se puede cambiar el estado de un pedido cancelado');
      return;
    }

    const parseEstado = EstadoPedido[nuevoEstado];

    this.isLoading.set(true);
    this.httpClient
      .put(
        `pedidos/cambiar-estado/${pedidoComidaId}/${parseEstado}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        }
      )
      .subscribe({
        next: () => {
          toast.success('Estado actualizado con éxito');
          this.relaodDetalle?.();
          this.isLoading.set(false);
        },
        error: () => {
          toast.error('Error al actualizar el estado');
          this.isLoading.set(false);
        },
      });
  }
}
