export interface UserSummaryModel {
  id: string;
  name: string;
  email: string;
}

export function createEmptyUserSummary(): UserSummaryModel {
  return {
    id: '',
    name: '',
    email: '',
  };
}
