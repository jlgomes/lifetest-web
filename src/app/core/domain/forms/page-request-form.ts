export interface PageRequestForm {
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sortList?: string[];
  sortOrder?: 'ASC' | 'DESC';
}
