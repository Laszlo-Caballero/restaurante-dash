export interface ResponseUsuarios {
  usuarioId: number;
  nombre: string;
  username: string;
  estado: boolean;
  role: string;
  lastLogin: string;
  pedidos: Pedido[];
}

export interface Pedido {
  comida: Comida;
  cantidad: number;
}

export interface Comida {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
}
