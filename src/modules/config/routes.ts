import { Router } from 'express'

import { AuthService } from '../../services/auth'

import { ConfigController } from './controller'

export class ConfigRoutes {
  private authSerivce: AuthService
  private readonly _router: Router = new Router()
  private readonly controller: ConfigController = new ConfigController()

  public constructor(defaultStrategy?: string) {
    this.authSerivce = new AuthService(defaultStrategy)
    this.initRoutes()
  }

  public get router(): Router {
    return this._router
  }

  private initRoutes() {
    this._router.get(
      '/cache',
      this.authSerivce.isAuthorized(),
      this.authSerivce.hasPermission('config', 'getCache'),
      this.controller.getCache
    )
    this._router.delete(
      '/cache',
      this.authSerivce.isAuthorized(),
      this.authSerivce.hasPermission('config', 'deleteCache'),
      this.controller.deleteCache
    )
  }
}
