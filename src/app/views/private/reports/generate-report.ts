import { TranslateService } from '@ngx-translate/core';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface ReportDetails {
  title: string;
  description: string;
  data: Object[];
  image: HTMLCanvasElement | null;
}

export function generateReportPDF(
  translate: TranslateService,
  reports: ReportDetails[]
): void {
  const doc: jsPDF = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
    compress: true,
  }).deletePage(1);

  const translations = {
    reportName: translate.instant('total-errors.title'),
    reportPeriod: translate.instant('common.period'),
    reportDate: translate.instant('common.date'),
    generatedWhen: translate.instant('reports-pdf.generated-when'),
    headers: {
      model: translate.instant('common.model'),
      rack: translate.instant('common.rack'),
      powerCycle: translate.instant('common.power-cycle'),
      highVoltage: translate.instant('common.high-voltage'),
      lowVoltage: translate.instant('common.low-voltage'),
      total: translate.instant('common.total'),
    },
  };

  const date = dayjs();
  const imagesDirectory: string = 'assets/images';
  const reportDate: string = date.format('DD/MM/YYYY HH:mm:ss');
  const reportGeneratedText: string = `${translations.generatedWhen}: ${reportDate}`;
  const filenameDate: string = date.format('YYYY-MM-DD HH-mm-ss');
  const filename: string = `${filenameDate}.pdf`;

  for (const report of reports) {
    doc.addPage();
    drawHeader();
    drawContent(report);
    drawFooter();
  }
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

  function drawContent(report: ReportDetails) {
    const reportPeriod: string = `${translations.reportPeriod}: {data.period}`;
    const reportDescription: string = translate.instant(report.description);

    const xReportInfo: number = 20;
    const yReportInfo: number = 70;

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(translate.instant(report.title), xReportInfo, yReportInfo);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(reportPeriod, xReportInfo, yReportInfo + 10);
    doc.text(reportDescription, xReportInfo, yReportInfo + 20);

    var img = new Image();
    img.src = report.image?.toDataURL() ?? '';
    const imageScale: number = 350;
    const aspectRatio: number =
      (report.image?.height ?? 0) / (report.image?.width ?? 1);
    const xImg = center(imageScale);
    const yImg = 100;

    doc.addImage(img, 'png', xImg, yImg, imageScale, imageScale * aspectRatio);

    const reportData: any = report.data.map((item: any) => [
      item.label ?? '',
      item.quantity ?? '',
    ]);

    autoTable(doc, {
      startY: 300,
      showHead: 'firstPage',
      head: [[translations.headers.model, translations.headers.rack]],
      body: reportData,
      styles: {
        lineColor: '#2c3e50',
        lineWidth: 1,
      },
      headStyles: {
        fillColor: '#394F68',
        fontSize: 18,
      },
      bodyStyles: {
        fontSize: 14,
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

  function center(elementWidth: number): number {
    return (doc.internal.pageSize.getWidth() - elementWidth) / 2;
  }
}
