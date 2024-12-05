export interface PageModel<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  pageable: PageableObject;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface PageableObject {
  offset: number;
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export function createEmptyPage<T>(): PageModel<T> {
  return {
    totalPages: 0,
    totalElements: 0,
    size: 0,
    content: [],
    number: 0,
    sort: createEmptySort(),
    pageable: createEmptyPageableObject(),
    first: false,
    last: false,
    numberOfElements: 0,
    empty: true,
  };
}

export function createEmptyPageableObject(): PageableObject {
  return {
    offset: 0,
    sort: createEmptySort(),
    pageNumber: 0,
    pageSize: 0,
    paged: false,
    unpaged: false,
  };
}

export function createEmptySort(): Sort {
  return {
    empty: false,
    sorted: false,
    unsorted: false,
  };
}
