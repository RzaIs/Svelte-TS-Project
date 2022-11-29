import type AuthPublicKeyDTO from "@data/models/auth/auth.public.key.dto"
import type AuthLoginBody from "@data/models/auth/auth.login.body"
import type AuthTokenDTO from "@data/models/auth/auth.token.dto"
import type AuthRegisterBody from "@data/models/auth/auth.register.body"

export default abstract class AuthApi {
  abstract getPublicKey(): Promise<AuthPublicKeyDTO>
  abstract login(credentials: AuthLoginBody): Promise<AuthTokenDTO>
  abstract register(credentials: AuthRegisterBody): Promise<AuthTokenDTO>
}