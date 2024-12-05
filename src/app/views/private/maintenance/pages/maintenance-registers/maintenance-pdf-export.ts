import { MaintenanceModel } from '@core/domain/models/maintenance-model';
import { TranslateService } from '@ngx-translate/core';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatetimePipe } from 'src/app/shared/pipes/datetime/datetime.pipe';

export function generateMaintenanceReport(
  data: MaintenanceModel,
  translate: TranslateService
): void {
  const doc: jsPDF = new jsPDF({
    unit: 'px',
    format: 'a4',
  });

  const translations = {
    reportName: translate.instant('maintenance.report-title'),
    reportDescription: translate.instant('maintenance.report-description'),
    generatedWhen: translate.instant('reports-pdf.generated-when'),
    headers: {
      id: translate.instant('maintenance.maintenance-id'),
      rack: translate.instant('common.rack'),
      slot: translate.instant('common.slot'),
      type: translate.instant('maintenance.type'),
      status: translate.instant('maintenance.Status'),
      observation: translate.instant('maintenance.observation'),
      registeredIn: translate.instant('maintenance.registered-in'),
      maintenancePeriod: translate.instant('maintenance.maintenance-period'),
      completionDate: translate.instant('maintenance.maintenance-date'),
    },
  };

  const date = dayjs();
  const imagesDirectory: string = 'assets/images';
  const reportDate: string = date.format('DD/MM/YYYY HH:mm:ss');
  const reportGeneratedText: string = `${translations.generatedWhen}: ${reportDate}`;
  const filenameDate: string = date.format('YYYY-MM-DD HH-mm-ss');
  const filename: string = `${filenameDate}.pdf`;

  drawHeader();
  drawContent();
  drawFooter();
  doc.save(filename);

  function drawHeader() {
    const imageScale: number = 100;
    const xLogo1: number = 20;
    const xLogo2: number =
      doc.internal.pageSize.getWidth() - imageScale - xLogo1;
    const yLogo: number = 15;

    const logoLifeTest: HTMLImageElement = new Image();
    logoLifeTest.width = 600;
    logoLifeTest.height = 185;
    logoLifeTest.src = `${imagesDirectory}/logo-blank.png`;

    const logoVantiva: HTMLImageElement = new Image();
    logoVantiva.width = 417;
    logoVantiva.height = 130;
    logoVantiva.src = `${imagesDirectory}/vantiva-logo.png`;

    const aspectRatio: number = logoLifeTest.height / logoLifeTest.width;

    doc.addImage(
      logoLifeTest.src,
      'png',
      xLogo1,
      yLogo,
      imageScale,
      imageScale * aspectRatio
    );
    doc.addImage(
      logoVantiva.src,
      'png',
      xLogo2,
      yLogo,
      imageScale,
      imageScale * aspectRatio
    );
  }

  function drawContent() {
    const xReportInfo: number = 20;
    const yReportInfo: number = 90;

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(translations.reportName, xReportInfo, yReportInfo);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(translations.reportDescription, xReportInfo, yReportInfo + 20);

    const datetime = new DatetimePipe()
    const body = [
      [translations.headers.id, data.id],
      [translations.headers.rack, data.slot.rack.name],
      [translations.headers.slot, data.slot.name],
      [translations.headers.status, translate.instant(data.status as string)],
      [translations.headers.type,translate.instant(data.maintenanceType as string)],
      [translations.headers.registeredIn, datetime.transform(data.createdAt)],
      [translations.headers.maintenancePeriod, datetime.transform(data.deadlineDate, 'DD/MM/YYYY')],
    ];

    if (data.completionDate)
      body.push([translations.headers.completionDate, data.completionDate]);
    body.push([translations.headers.observation, data.observation]);

    autoTable(doc, {
      startY: 140,
      showHead: 'firstPage',
      body,
      styles: {
        lineColor: '#A1B4CD',
        lineWidth: 1,
      },
      bodyStyles: {
        fontSize: 14,
      },
      columnStyles: {
        0: { cellWidth: 120 },
      },
      didParseCell: (data) => {
        if (data.column.index === 0) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = '#2A3D53';
          data.cell.styles.textColor = 'white';
        } else {
          data.cell.styles.fontStyle = 'normal';
          data.cell.styles.fillColor = '#EFF4FF';
          data.cell.styles.textColor = '#0D1E30';
        }
      },
    });
  }

  function drawFooter() {
    const xDate: number = 20;
    const yDate: number = doc.internal.pageSize.getHeight() - 5;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(reportGeneratedText, xDate, yDate);
  }
}
