import type AuthRepo from "@data/repositories/auth/auth.repo"
import BaseController from "@interface/base/base.controller"

export default class AuthController extends BaseController {
  constructor(private authRepo: AuthRepo) {
    super()
  }

  login(params: {
    username: string,
    password: string
  }) {
    this.authRepo.login(params)
      .catch((e) => alert(e))
  }

  register(params: {
    email: string,
    username: string,
    password: string
  }) {
    this.authRepo.register(params)
      .catch((e) => alert(e))
  }
}

export enum AuthType {
  LOGIN, REGISTER
}
