import type { Axios } from "axios"
import type AuthLoginBody from '@data/models/auth/auth.login.body'
import type AuthPublicKeyDTO from "@data/models/auth/auth.public.key.dto"
import type AuthRegisterBody from "@data/models/auth/auth.register.body"
import type AuthTokenDTO from "@data/models/auth/auth.token.dto"
import type AuthApi from "@data/api/auth/auth.api"

export default class AuthApiImp implements AuthApi {
  private urls = {
    key: 'auth/rsa-key',
    login: 'auth/login',
    register: 'auth/register',
    refreshToken: 'auth/refresh-token'
  }

  constructor(private axios: Axios) { }

  async getPublicKey(): Promise<AuthPublicKeyDTO> {
    return (
      await this.axios.get(this.urls.key)
    ).data
  }

  async login(credentials: AuthLoginBody): Promise<AuthTokenDTO> {
    return (
      await this.axios.post(this.urls.login, credentials)
    ).data
  }

  async register(credentials: AuthRegisterBody): Promise<AuthTokenDTO> {
    return (
      await this.axios.post(this.urls.register, credentials)
    ).data
  }
}
