import {AuthLocalStorageService} from "@core/domain/services/auth-local-storage.service";

export function checkAccessCode(code: string): boolean {
  const {accessCodes} = new AuthLocalStorageService().getAllLocalStorage()
  return (accessCodes?.has(code) ?? false)
}
