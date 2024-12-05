import { DelimitationAreaLedImageForm } from "src/app/views/private/products/model/delimitaion-area-led-imagem-form";

export interface ProductForm {
  model: string;
  imageBase64: string;
  type: 'VERTICAL' | 'HORIZONTAL';
  color: string;
  clientId: string;
  numberPorts: number;
  hasLed2G: boolean;
  hasLed5G: boolean;
  hasLedPower: boolean;
  delimitationAreaLeds: DelimitationAreaLedImageForm[];
}
