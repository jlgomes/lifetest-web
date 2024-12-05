export enum MimeTypes {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  PDF = 'application/pdf',
  ExcelOld = 'application/vnd.ms-excel', // Excel 97-2003
  ExcelNew = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel 2007+
  ZIP = 'application/zip',
  RAR = 'application/vnd.rar',
  RARCompressed = 'application/x-rar-compressed',
}

export const supportedImageMimeTypes: string[] = [
  MimeTypes.PNG,
  MimeTypes.JPEG,
];

export const supportedRepairMimeTypes: string[] = [
  MimeTypes.PDF,
  MimeTypes.ExcelOld,
  MimeTypes.ExcelNew,
  MimeTypes.ZIP,
  MimeTypes.RAR,
  MimeTypes.RARCompressed,
];

export function getMimeType(base64String: string) {
  // Remove the data URI scheme if it exists
  const base64Header = base64String.split(',')[0];

  if (base64Header.indexOf('data:') === 0) {
    return base64Header.split(';')[0].split(':')[1];
  }

  // If no header is present, return a default MIME type
  return 'application/octet-stream';
}

export function getFileExtension(type: string) {
  let extension: string = '';
  switch (type) {
    case 'x-tika-ooxml':
      extension = '.xlsx';
      break;
    case 'x-tika-msoffice':
      extension = '.xls';
      break;
    case 'pdf':
      extension = '.pdf';
      break;
    case 'zip':
      extension = '.zip';
      break;
    case type.match(/rar/)?.input:
      extension = '.rar';
      break;
  }
  return extension;
}

export function isValidRepairFile(mimeType: string | undefined): boolean {
  if (!mimeType) return false;
  return supportedRepairMimeTypes.includes(mimeType);
}
