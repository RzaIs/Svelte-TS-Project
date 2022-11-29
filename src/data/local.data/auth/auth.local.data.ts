import type { Observable } from "rxjs"

export default abstract class AuthLocalData {
  abstract get accessToken(): string | undefined
  abstract get refreshToken(): string | undefined
  abstract get loginState(): boolean
  abstract get observeLoginState(): Observable<boolean>

  abstract setAccessToken(token: string): void
  abstract setRefreshToken(token: string): void
  abstract setLoginState(state: boolean): void
  abstract removeTokens(): void
}