import { PaginationStore } from "@/features";

export const getPaginatorProps = (paginationStore: PaginationStore) => {
  return {
    paginator: true,
    first: paginationStore.first,
    rows: paginationStore.pageSize,
    //rowsPerPageOptions: paginationStore.pageSizeOptions,
    totalRecords: paginationStore.totalCount,
  };
};
