export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationResponse<T> {
  result: T;
  total: number;
}

export const getSkipAndTake = (page, pageSize) => {
  return {
    skip: page ? (page - 1) * pageSize : undefined,
    take: pageSize,
  };
};

export const getPaginationParams = (page, pageSize): PaginationParams => {
  return {
    page: page ? parseInt(page) : undefined,
    pageSize: pageSize ? parseInt(pageSize) : undefined,
  };
};
