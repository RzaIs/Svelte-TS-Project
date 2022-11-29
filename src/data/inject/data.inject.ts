import axios, { Axios } from "axios"
import type AuthRepo from "@data/repositories/auth/auth.repo"
import type AuthApi from "@data/api/auth/auth.api"
import type RSAEncryptor from "@data/crypto/rsa.encryptor"
import RSAEncryptorImp from "@data/crypto/rsa.encryptor.imp"
import type LocalProvider from "@data/local.provider/local.provider"
import LocalProviderImp from "@data/local.provider/local.provider.imp"
import AuthRepoImp from "@data/repositories/auth/auth.repo.imp"
import type AuthLocalData from "@data/local.data/auth/auth.local.data"
import AuthLocalDataImp from "@data/local.data/auth/auth.local.data.imp"
import AuthApiImp from "@data/api/auth/auth.api.imp"
import type PostApi from "@data/api/post/post.api"
import PostApiImp from "@data/api/post/post.api.imp"
import type PostLocalData from "@data/local.data/post/post.local.data"
import PostLocalDataImp from "@data/local.data/post/post.local.data.imp"
import type PostRepo from "@data/repositories/post/post.repo"
import PostRepoImp from "@data/repositories/post/post.repo.imp"

export default class DataInject {
  constructor(
    private baseURL: string
  ) { }

  // Tools & Providers

  get rsaEncryptor(): RSAEncryptor {
    return new RSAEncryptorImp()
  }

  get localProvider(): LocalProvider {
    return new LocalProviderImp()
  }

  get axios(): Axios {
    return axios.create({ baseURL: this.baseURL })
  }

  // Apis

  get authApi(): AuthApi {
    return new AuthApiImp(this.axios)
  }

  get postApi(): PostApi {
    return new PostApiImp(this.axios, this.authLocalData)
  }

  // Local Datas

  authLocalData: AuthLocalData = new AuthLocalDataImp(
    this.localProvider
  )

  postLocalData: PostLocalData = new PostLocalDataImp(
    this.localProvider
  )

  // Repositories

  get authRepo(): AuthRepo {
    return new AuthRepoImp(
      this.authApi,
      this.rsaEncryptor,
      this.authLocalData
    )
  }

  get postRepo(): PostRepo {
    return new PostRepoImp(
      this.postApi,
      this.postLocalData
    )
  }
}