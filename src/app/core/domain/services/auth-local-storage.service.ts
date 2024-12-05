import {AuthStorageKeys} from "@core/infra/utils/auth-storage-keys";
import {TokenModel} from "@core/domain/models/token-model";
import {ProfileModel} from "@core/domain/models/profile-model";
import {Injectable} from "@angular/core";
import {UserModel} from "@core/domain/models/user-model";
import {ProfileWithCodeRouteModel} from "@core/domain/models/profile-with-code-route-model";

interface AllLocal {
  token: string | null
  profile: ProfileModel | null
  user: UserModel | null
  accessCodes: Set<string> | null
}

@Injectable({
  providedIn: 'root',
})
export class AuthLocalStorageService {

  addAuthLocalStorage(data: TokenModel) {
    const {token, user} = data

    if (this.getPreferedLanguage() == null) {
      this.serPreferedLanguage("pt")
    }

    localStorage.setItem(AuthStorageKeys.TOKEN, token)
    this.saveUser(user);
  }

  getAllLocalStorage(): AllLocal {
    const user = localStorage.getItem(AuthStorageKeys.USER)
    const profile = localStorage.getItem(AuthStorageKeys.PROFILE)
    const accessCodes = localStorage.getItem(AuthStorageKeys.ACCESS_CODE)
    return {
      token: localStorage.getItem(AuthStorageKeys.TOKEN),
      profile: profile !== null ? JSON.parse(profile) : null,
      user: user !== null ? JSON.parse(user) : null,
      accessCodes: accessCodes !== null ? new Set(JSON.parse(accessCodes)) : null
    } as AllLocal
  }

  getTokens(): string | null {
    return localStorage.getItem(AuthStorageKeys.TOKEN)
  }

  getPreferedLanguage(): string | null {
    return localStorage.getItem(AuthStorageKeys.PREFERED_LANGUAGE)
  }

  serPreferedLanguage(language: string) {
    return localStorage.setItem(AuthStorageKeys.PREFERED_LANGUAGE, language)
  }

  logOutSystem(): void {
    localStorage.clear();
  }

  updateUser(user: UserModel) {
    const all = this.getAllLocalStorage()
    if (all.user?.id == user.id) {
      this.saveUser(user);
      window.location.reload();
    }
  }

  updateProfile(profile: ProfileWithCodeRouteModel) {
    const all = this.getAllLocalStorage()
    if (all.profile?.id == profile.id) {
      this.saveProfile(profile)
      window.location.reload();
    }
    return profile;
  }

  private saveUser(user: UserModel) {
    localStorage.setItem(AuthStorageKeys.USER, JSON.stringify(user))
    this.saveProfile(user.profile)

  }

  private saveProfile(profile: ProfileWithCodeRouteModel) {
    const accessCodes = new Set(profile.routes.map(route=> route.code))
    localStorage.setItem(AuthStorageKeys.PROFILE, JSON.stringify(profile))
    localStorage.setItem(AuthStorageKeys.ACCESS_CODE, JSON.stringify(Array.from(accessCodes)))
  }
}
