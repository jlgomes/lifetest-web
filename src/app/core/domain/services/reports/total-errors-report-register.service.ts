import { Injectable } from '@angular/core';
import { TotalErrorsReportDataModel } from '@core/domain/models/reports/total-errors-report';

@Injectable({
  providedIn: 'root'
})
export class TotalErrorsReportRegister {
  private sharedData: TotalErrorsReportDataModel | undefined;

  setSharedData(data: TotalErrorsReportDataModel) {
    this.sharedData = data;
  }

  getSharedData(): TotalErrorsReportDataModel | undefined {
    return this.sharedData;
  }

}
