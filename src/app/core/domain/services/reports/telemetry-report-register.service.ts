import { Injectable } from '@angular/core';
import { TelemetryReportDataModel } from '@core/domain/models/reports/telemetry-report';

@Injectable({
  providedIn: 'root'
})
export class TelemetryReportRegister {
  private sharedData: TelemetryReportDataModel | undefined;

  setSharedData(data: TelemetryReportDataModel) {
    this.sharedData = data;
  }

  getSharedData(): TelemetryReportDataModel | undefined {
    return this.sharedData;
  }

}
