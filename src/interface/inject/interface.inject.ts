import ContainerController from "@interface/pages/container/controller"
import AuthController from "@interface/pages/auth/controller"
import HomeController from "@interface/pages/home/controller"
import type DataInject from "@data/inject/data.inject"

export default class InterfaceInject {
  constructor(
    public dependency: DataInject
  ) { }

  get containerController(): ContainerController {
    return new ContainerController(this.dependency.authRepo)
  }

  get authController(): AuthController {
    return new AuthController(this.dependency.authRepo)
  }

  get homeController(): HomeController {
    return new HomeController(this.dependency.postRepo)
  }
}