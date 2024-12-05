import { ProductModel, createEmptyProduct } from "@core/domain/models/product-model";

export interface StatsModel {
  errorFreeDays?: number;
  modelWithFewerErrors?: ProductModel;
  modelWithTheMostErrors?: ProductModel;
  modelWithMoreTests?: ProductModel;
  temperature?: number;
  countProductWithMoreTestByLastMonth: CountProductModel[];
  withMoreFailuresOnWeekdays: WithMoreFailuresOnWeekdaysModal[];
}

export interface CountProductModel {
  value: number;
  data: ProductModel;
}
export interface WithMoreFailuresOnWeekdaysModal {
  value: number;
  data: number;
}

export function createEmptyStats(): StatsModel {
  return {
    errorFreeDays: undefined,
    modelWithFewerErrors: undefined,
    modelWithTheMostErrors: undefined,
    modelWithMoreTests: undefined,
    temperature: undefined,
    countProductWithMoreTestByLastMonth: [],
    withMoreFailuresOnWeekdays: [],
  };
}

export function createEmptyCountProduct(): CountProductModel {
  return {
    value: 0,
    data: createEmptyProduct(),
  };
}

export function createEmptyWithMoreFailuresOnWeekdays(): WithMoreFailuresOnWeekdaysModal {
  return {
    value: 0,
    data: 0,
  };
}
