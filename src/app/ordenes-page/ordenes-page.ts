import { MesasOrdenesMessage } from '@/interfaces/ordenes.interface';
import { WebsocketService } from '@/services/websocket/websocket-service';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Title } from '@/components/ui/title/title';
import { CardTable } from '@/components/ui/card-table/card-table';
import { CreateOrden } from '@/modules/ordenes/create-orden/create-orden';

@Component({
  selector: 'app-ordenes-page',
  imports: [Title, CardTable, CreateOrden],
  templateUrl: './ordenes-page.html',
})
export class OrdenesPage implements OnInit, OnDestroy {
  websocketService = inject(WebsocketService);
  mesas = signal<MesasOrdenesMessage[]>([]);

  isOpenCreateOrden = signal<{
    isOpen: boolean;
    mesaId: number;
    pedidoId?: number;
  }>({
    isOpen: false,
    mesaId: -1,
    pedidoId: undefined,
  });

  ngOnInit() {
    this.websocketService.connect({
      subscribes: [
        {
          destination: '/topic/todas-las-ordenes',
          callback: (msg: MesasOrdenesMessage[]) => {
            this.mesas.set(msg);
          },
        },
        {
          destination: '/topic/ordenes',
          callback: (msg: MesasOrdenesMessage[]) => {
            this.mesas.set(msg);
          },
        },
      ],
      onConnectCallback: () => {
        this.websocketService.sendMessage('/app/todas-las-ordenes', {});
      },
    });
  }

  ngOnDestroy() {
    this.websocketService.disconnect();
  }

  clickedMesa(mesaId: number) {
    const findMesa = this.mesas().find(({ mesa }) => mesa.mesaId === mesaId);

    this.isOpenCreateOrden.set({
      isOpen: true,
      mesaId,
      pedidoId: findMesa?.ordenId,
    });
  }

  closeModal = () => {
    this.isOpenCreateOrden.set({
      isOpen: false,
      mesaId: -1,
      pedidoId: undefined,
    });
  };
}
