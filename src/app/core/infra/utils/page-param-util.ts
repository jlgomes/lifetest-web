export const pageParamUtil = (params: {
  search?: string
  startDate?: string
  endDate?: string
  page?: number
  size?: number
  sortList?: string[]
  sortOrder?: 'ASC' | 'DESC'
}): { [key: string]: any } => {
  const queryParams: { [key: string]: any } = {};

  if (params.page) {
    queryParams["page"] = params.page;
  }
  if (params.size) {
    queryParams["size"] = params.size;
  }
  if (params.sortList && params.sortList.length > 0) {
    queryParams["sortList"] = params.sortList.join(',');
  }
  if (params.sortOrder) {
    queryParams["sortOrder"] = params.sortOrder;
  }
  if (params.startDate) {
    queryParams["startDate"] = params.startDate;
  }
  if (params.endDate) {
    queryParams["endDate"] = params.endDate;
  }
  if (params.search) {
    queryParams["search"] = params.search;
  }

  return queryParams;
}
