import {
  DataTable,
  DataTableProps,
  DataTableValueArray,
} from "primereact/datatable";

export function CrudDataTable<TValue extends DataTableValueArray>({
  children,
  scrollable = true,
  scrollHeight = "flex",
  stripedRows = false,
  showGridlines = true,
  resizableColumns = true,
  lazy = true,
  ...props
}: DataTableProps<TValue>) {
  return (
    <DataTable
      scrollable={scrollable}
      scrollHeight={scrollHeight}
      stripedRows={stripedRows}
      showGridlines={showGridlines}
      resizableColumns={resizableColumns}
      lazy={lazy}
      {...props}
    >
      {children}
    </DataTable>
  );
}
