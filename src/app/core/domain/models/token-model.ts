import { UserModel, createEmptyUser } from "@core/domain/models/user-model";

export interface TokenModel {
  token: string;
  user: UserModel;
}

export function createEmptyToken(): TokenModel {
  return {
    token: '',
    user: createEmptyUser(),
  };
}
