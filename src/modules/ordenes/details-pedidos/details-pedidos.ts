import { Component, Input } from '@angular/core';
import { Modal } from '@/components/ui/modal/modal';
import { ResponseOrden } from '@/interfaces/ordenes.interface';
import { LucideAngularModule, X } from 'lucide-angular';
import { parseDate } from '@/utils/parseDate';
import { Bagde } from '@/components/ui/bagde/bagde';

@Component({
  selector: 'app-details-pedidos',
  imports: [Modal, LucideAngularModule, Bagde],
  templateUrl: './details-pedidos.html',
})
export class DetailsPedidos {
  @Input({ required: true }) orden!: ResponseOrden;
  @Input({ required: true }) onCloseModal!: () => void;

  XIcon = X;
  parseDate = parseDate;
}
