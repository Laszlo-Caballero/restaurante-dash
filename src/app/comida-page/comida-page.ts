import { Component } from '@angular/core';
import { Title } from '../../components/ui/title/title';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { ComidaResponse } from '../../interfaces/response.interface';
import { comidaMock } from '../../mock/comida';
import { Table } from '../../components/ui/table/table';
import { ColumnDef } from '../../interfaces/table.interface';

@Component({
  selector: 'app-comida-page',
  imports: [LucideAngularModule, Title, RouterLink, Table],
  templateUrl: './comida-page.html',
})
export class ComidaPage {
  readonly PlusIcon = Plus;
  data: ComidaResponse[] = comidaMock;
  columns: ColumnDef<ComidaResponse>[] = [
    {
      header: 'Nombre',
      accessorKey: 'nombre',
    },
    {
      header: 'Precio',
      cell({ row }) {
        return `<span class="text-gray-500 font-semibold text-lg">$${row.precio.toFixed(2)}</span>`;
      },
    },
    {
      header: 'Disponible',
      cell({ row }) {
        return `<span class="py-1 px-2 border border-gray-300 rounded-xl font-semibold">${
          row.disponible ? 'Activo' : 'Desactivado'
        }</span>`;
      },
    },
  ];
}
