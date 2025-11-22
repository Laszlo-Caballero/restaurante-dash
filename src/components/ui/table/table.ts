import { Component, Input } from '@angular/core';
import { ColumnDef } from '../../../interfaces/table.interface';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [NgTemplateOutlet],
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
        if (col.cellTemplate) return { template: col.cellTemplate, row, value: '' };

        const value = col.accessorKey ? (row[col.accessorKey] as string) : col.cell?.({ row });

        return { template: null, row, value };
      });
    });
  }

  getFooter() {
    return this.columns.map((col) => col.footer || col.footerComponent?.());
  }
}
