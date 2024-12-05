import { ProductModel, createEmptyProduct } from "@core/domain/models/product-model";
import { UserModel, createEmptyUser } from "@core/domain/models/user-model";
import { SlotModel, createEmptySlot } from "./slot-model";

export interface TestModel {
  id: string;
  createdAt: string;
  product: ProductModel;
  user: UserModel;
  slot: SlotModel;
  Status: string;
  duration: number;
  startDate: string;
  estimatedFinishDate: string;
  finishDate?: string;
  serialProduct: string;
  serialBox: string;
  serialPowerSource: string;
}

export function createEmptyTest(): TestModel {
  return {
    id: '',
    createdAt: '',
    product: createEmptyProduct(),
    user: createEmptyUser(),
    slot: createEmptySlot(),
    Status: '',
    duration: 0,
    startDate: '',
    estimatedFinishDate: '',
    serialProduct: '',
    serialBox: '',
    serialPowerSource: '',
  };
}
