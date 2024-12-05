import { ProfileWithCodeRouteModel, createEmptyProfileWithCodeRoute } from "@core/domain/models/profile-with-code-route-model";

export interface UserModel {
  id: string;
  name: string;
  email: string;
  profile: ProfileWithCodeRouteModel;
  status: 'ACTIVE' | 'INACTIVE' | 'WAITING_VALIDATION_EMAIL' | 'RECOVERY_PASSWORD'
}

export function createEmptyUser(): UserModel {
  return {
    id: '',
    name: '',
    email: '',
    profile: createEmptyProfileWithCodeRoute(),
    status: 'ACTIVE',
  };
}
