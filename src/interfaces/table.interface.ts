export interface ColumnDef<T> {
  header?: string;
  headerComponent?: () => string;
  accessorKey?: keyof T;
  cell?: (row: { row: T }) => string;
  footer?: string;
  footerComponent?: () => string;
}
