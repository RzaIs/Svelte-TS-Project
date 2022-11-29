import type { Observable } from "rxjs"

export default abstract class AuthRepo {
  abstract login(params: {
    username: string,
    password: string
  }): Promise<void>
  
  abstract register(params: {
    email: string,
    username: string,
    password: string
  }): Promise<void>

  abstract logout(): void
  abstract get loginState(): boolean
  abstract get observeLoginState(): Observable<boolean>
}