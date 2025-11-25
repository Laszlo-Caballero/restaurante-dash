import { ResponseOrden } from '@/interfaces/ordenes.interface';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { InputComponent } from '@/components/ui/input/input';
import { Bagde } from '@/components/ui/bagde/bagde';
import { Check, Clock, CreditCardIcon, LucideAngularModule, Printer } from 'lucide-angular';
import { cx } from '@/utils/cx';
import { Button } from '@/components/ui/button/button';

@Component({
  selector: 'app-detalle-pedido',
  imports: [InputComponent, Bagde, LucideAngularModule, Button],
  templateUrl: './detalle-pedido.html',
})
export class DetallePedido {
  @Input() detalle?: ResponseOrden;
  @Input() className?: string = '';

  CardIcon = CreditCardIcon;
  EstadoIcon = Clock;
  PrinterIcon = Printer;
  CheckIcon = Check;

  @ViewChild('printSection') printSection!: ElementRef<HTMLDivElement>;

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
}
