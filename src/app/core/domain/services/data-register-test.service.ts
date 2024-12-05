import { Injectable } from '@angular/core';
import { ProductModel } from "@core/domain/models/product-model";
import { SlotModel } from '../models/slot-model';

export interface DataRegisterTestModel {
  slots: SlotModel[];
  product: ProductModel;
  duration: number;
  start: string;
  end: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataRegisterTestService {
  private data?: DataRegisterTestModel;

  setData(data: DataRegisterTestModel) {
    this.data = data;
  }

  getData(): DataRegisterTestModel | undefined {
    return this.data;
  }
}
