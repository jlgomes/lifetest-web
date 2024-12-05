import { Injectable } from '@angular/core';
import { RecurringErrorsReportDataModel } from '@core/domain/models/reports/recurring-errors-report';

@Injectable({
  providedIn: 'root'
})
export class RecurringErrorsReportRegister {
  private sharedData: RecurringErrorsReportDataModel | undefined;

  setSharedData(data: RecurringErrorsReportDataModel) {
    this.sharedData = data;
  }

  getSharedData(): RecurringErrorsReportDataModel | undefined {
    return this.sharedData;
  }

}
