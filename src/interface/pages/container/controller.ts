import type AuthRepo from "@data/repositories/auth/auth.repo"
import BaseController from "@interface/base/base.controller"
import type { Observable } from "rxjs"

export default class ContainerController extends BaseController{
  constructor(private authRepo: AuthRepo) { 
    super()
  }

  get loginState(): boolean {
    return this.authRepo.loginState
  }

  get observeLoginState(): Observable<boolean> {
    return this.authRepo.observeLoginState
  }
}