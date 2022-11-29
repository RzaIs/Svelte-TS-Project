import type AuthRepo from "@data/repositories/auth/auth.repo"
import type AuthApi from "@data/api/auth/auth.api"
import type RSAEncryptor from "@data/crypto/rsa.encryptor"
import type AuthLocalData from "@data/local.data/auth/auth.local.data"
import type { Observable } from "rxjs"

export default class AuthRepoImp implements AuthRepo {

  constructor(
    private api: AuthApi,
    private rsa: RSAEncryptor,
    private localData: AuthLocalData
  ) { }

  async login(params: {
    username: string,
    password: string
  }): Promise<void> {
    let step = 0
    try {
      const publicKey = await this.api.getPublicKey()
      step = 1
      const encryptedPassword = await this.rsa.encrypt(params.password, publicKey.key)
      step = 2
      const tokens = await this.api.login({
        username: params.username,
        encryptedPassword: encryptedPassword,
        keyID: publicKey.id
      })
      step = 3
      this.localData.setAccessToken(tokens.accessToken)
      this.localData.setRefreshToken(tokens.refreshToken)
      this.localData.setLoginState(true)
    } catch (error) {
      throw Error(`AUTH@1.${step}`)
    }
  }
  
  async register(params: {
    email: string,
    username: string,
    password: string
  }): Promise<void> {
    let step = 0
    try {
      const publicKey = await this.api.getPublicKey()
      step = 1
      const encryptedPassword = await this.rsa.encrypt(params.password, publicKey.key)
      step = 2
      const tokens = await this.api.register({
        email: params.email,
        username: params.username,
        encryptedPassword: encryptedPassword,
        keyID: publicKey.id
      })
      step = 3
      this.localData.setAccessToken(tokens.accessToken)
      this.localData.setRefreshToken(tokens.refreshToken)
      this.localData.setLoginState(true)
    } catch (error) {
      throw Error(`AUTH@2.${step}`)
    }
  }

  logout(): void {
    this.localData.removeTokens()
    this.localData.setLoginState(false)
  }

  get loginState(): boolean {
    return this.localData.loginState
  }
  
  get observeLoginState(): Observable<boolean> {
    return this.localData.observeLoginState
  }
}