export interface IPagination {
  page: number;
  pageSize: number;
  totalPages: number;
  totalChallenges: number;
  containsNextPage: boolean;
}
