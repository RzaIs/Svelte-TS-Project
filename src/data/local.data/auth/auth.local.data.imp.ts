import type AuthLocalData from "@data/local.data/auth/auth.local.data"
import { CookieKeys, LocalStorageKeys } from "@data/local.provider/local.keys"
import type LocalProvider from "@data/local.provider/local.provider"
import { BehaviorSubject, Observable } from "rxjs"

export default class AuthLocalDataImp implements AuthLocalData {

  private accessTokenCache: string | undefined = undefined
  private refreshTokenCache: string | undefined = undefined
  private loginSubject = new BehaviorSubject(false)

  constructor(private localProvider: LocalProvider) {
    this.loginSubject.next(this.loginState)
  }

  get accessToken(): string | undefined {
    if (this.accessTokenCache === undefined) {
      this.accessTokenCache = this.localProvider.readFromCookie(CookieKeys.AccessToken)
    }
    return this.accessTokenCache
  }

  get refreshToken(): string | undefined {
    if (this.refreshTokenCache === undefined) {
      this.refreshTokenCache = this.localProvider.readFromCookie(CookieKeys.RefreshToken)
    }
    return this.refreshTokenCache
  }

  get loginState(): boolean {
    return this.localProvider.readFromLocalStorage<boolean>(LocalStorageKeys.LoginState)!
  }

  get observeLoginState(): Observable<boolean> {
    return this.loginSubject.asObservable()
  }

  setAccessToken(token: string): void {
    this.localProvider.writeToCookie(token, CookieKeys.AccessToken)
  }

  setRefreshToken(token: string): void {
    this.localProvider.writeToCookie(token, CookieKeys.RefreshToken)
  }

  setLoginState(state: boolean): void {
    this.localProvider.writeToLocalStorage(state, LocalStorageKeys.LoginState)
    this.loginSubject.next(state)
  }

  removeTokens(): void {
    this.localProvider.readFromCookie(CookieKeys.AccessToken)
    this.localProvider.readFromCookie(CookieKeys.RefreshToken)
  }
}