import { PageRequestForm } from '@core/domain/forms/page-request-form';
import dayjs from 'dayjs';

type FormatDateParams = {
  date: string;
  time?: string;
  isStart?: boolean;
};

export const formatDate = ({ date, time = '', isStart }: FormatDateParams) => {
  const defaultFormat = 'YYYY-MM-DDTHH:mm:ss';
  const timeParsed = time?.length > 4 ? time : '00:00';

  const [hour, minute] = timeParsed.split(':').map(Number);

  const baseDate = dayjs(date)
    .hour(hour)
    .minute(minute)
    .minute(minute)
    .second(0);

  const finalDate = isStart ? baseDate.startOf('hour') : baseDate.endOf('hour');
  return finalDate.format(defaultFormat);
};

export const pageParamUtil = (
  params: PageRequestForm
): { [key: string]: any } => {
  const queryParams: { [key: string]: any } = {};

  if (params.page) {
    queryParams['page'] = params.page;
  }
  if (params.size) {
    queryParams['size'] = params.size;
  }
  if (params.sortList && params.sortList.length > 0) {
    queryParams['sortList'] = params.sortList.join(',');
  }
  if (params.sortOrder) {
    queryParams['sortOrder'] = params.sortOrder;
  }
  if (params.startDate) {
    queryParams['startDate'] = formatDate({
      date: params.startDate,
      time: params.startTime,
      isStart: true,
    });
  }
  if (params.endDate) {
    queryParams['endDate'] = formatDate({
      date: params.endDate,
      time: params.endTime,
      isStart: false,
    });
  }

  if (params.search) {
    queryParams['search'] = params.search;
  }

  return queryParams;
};
