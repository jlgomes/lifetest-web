export interface UserStorageType {
  token: string,
  user: {
    name: string,
    id: string,
    profile: {
      id: string,
      code: string,
      name: string,
      status: string,
    }
  }
}