import { IHandler, IMiddleware, IMiddlewareMap } from './types';

const ALL_KEY = '*';

export default class Middleware implements IMiddleware {

  private middleware: IMiddlewareMap = {};

  public addMiddleware(action: string | IHandler, middleware?: IHandler) {
    const actionKey = typeof action === 'string' ? action : ALL_KEY;
    const handler = typeof action === 'string' ? middleware : action;
    this.middleware[actionKey] = (this.middleware[actionKey] || []);
    this.middleware[actionKey].push(handler);
  }

  public getAllMiddleware(action: string): IHandler[] {
    let middleware = [];

    if (this.middleware[ALL_KEY]) {
      middleware = middleware.concat(this.middleware[ALL_KEY]);
    }

    if (this.middleware[action]) {
      middleware = middleware.concat(this.middleware[action]);
    }

    return middleware;
  }

}
