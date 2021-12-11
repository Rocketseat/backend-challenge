export interface IPagination {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  containsNextPage: boolean;
}
