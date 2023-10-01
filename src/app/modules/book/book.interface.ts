export type IBookFilterRequest = {
  search?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  category?: string | undefined;
  sortBy?: string | undefined;
  sortOrder?: 'asc' | 'desc' | undefined;
};
