import { Injectable } from '@angular/core';
import { TotalTestsReportDataModel } from '@core/domain/models/reports/total-tests-reports';

@Injectable({
  providedIn: 'root'
})
export class TotalTestsReportRegister {
  private sharedData: TotalTestsReportDataModel | undefined;

  setSharedData(data: TotalTestsReportDataModel) {
    this.sharedData = data;
  }

  getSharedData(): TotalTestsReportDataModel | undefined {
    return this.sharedData;
  }

}
