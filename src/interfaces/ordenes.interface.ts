import { EstadoOrden } from '@/enum/EstadoOrden';
import { ComidaResponse, ResponseMesa } from './response.interface';
import { ResponseUsuarios } from './user.interface';
import { EstadoPedido, PedidoEnum } from '@/enum/EstadoPedido';

export interface MesasOrdenesMessage {
  ordenId?: number;
  mesa: ResponseMesa;
  comidas: ComidaResponse[];
  estado: EstadoOrden;
}

export interface ResponseOrden {
  pedidoId: number;
  fechaCreacion: string;
  metodoPago: string;
  estado: PedidoEnum;
  mesa: ResponseMesa;
  total: number;
  comidas: ComidaOrden[];
}

export interface ComidaOrden {
  cantidad: number;
  comida: ComidaResponse;
  usuario: ResponseUsuarios;
  estado: EstadoPedido;
  pedidoComidaId: number;
}
