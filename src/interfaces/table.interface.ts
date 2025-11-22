import { TemplateRef } from '@angular/core';

export interface ColumnDef<T> {
  header?: string;
  headerComponent?: () => string;
  accessorKey?: keyof T;
  cell?: (row: { row: T }) => string;
  cellTemplate?: TemplateRef<unknown>;
  footer?: string;
  footerComponent?: () => string;
}
