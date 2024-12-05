import { Checkboxes } from "src/app/views/private/products/model/checkboxes";

export interface DialogModel<T> {
  checkboxes: Checkboxes | null;
  imagePreviewURL: string | null;
  element: T;
  id?: string;
  name?: string;
  subtitle?: string;
  title?: string;
  btnCancel?: boolean;
  btnClose?: boolean;
  btnConfirmLabel?: string;
  btnCancelLabel?: string;
  disabled?: boolean;
}

export interface ConfirmationDialogModel<T> extends DialogModel<T> {
  callback: (...args: any[]) => any;
}
