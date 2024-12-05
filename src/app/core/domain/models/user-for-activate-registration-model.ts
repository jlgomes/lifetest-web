export interface UserForActivateRegistrationModel {
  id: string;
  name: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE' | 'WAITING_VALIDATION_EMAIL' | 'RECOVERY_PASSWORD'
}

export function createEmptyUserForActivateRegistration(): UserForActivateRegistrationModel {
  return {
    id: '',
    name: '',
    email: '',
    status: 'WAITING_VALIDATION_EMAIL',
  };
}
