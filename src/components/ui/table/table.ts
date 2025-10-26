import { Component, Input } from '@angular/core';
import { ColumnDef } from '../../../interfaces/table.interface';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
})
export class Table<T> {
  @Input() data: T[] = [];
  @Input() columns: ColumnDef<T>[] = [];

  getHeaders() {
    return this.columns.map((col) => col.header || col.headerComponent?.());
  }

  getCells() {
    return this.data.map((row) => {
      return this.columns.map((col) => {
        return col.accessorKey ? (row[col.accessorKey] as string) : col.cell?.({ row });
      });
    });
  }

  getFooter() {
    return this.columns.map((col) => col.footer || col.footerComponent?.());
  }
}
