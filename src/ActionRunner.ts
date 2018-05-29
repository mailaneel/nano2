import {
  IActionRunner,
  IActions,
  IContextFactory,
  IHandlerComposer,
  IHandlerResolver,
  IMeta,
  IMiddleware,
  IParams,
  IService,
} from './types';

export default class ActionRunner implements IActionRunner {

  private actions: IActions;
  private middleware: IMiddleware;
  private handlerResolver: IHandlerResolver;
  private handlerComposer: IHandlerComposer;
  private contextFactory: IContextFactory;
  private resolvedActionHandlers: {
    [action: string]: any;
  } = {};

  constructor(
    actions: IActions,
    middleware: IMiddleware,
    handlerResolver: IHandlerResolver,
    handlerComposer: IHandlerComposer,
    contextFactory: IContextFactory,
  ) {
    this.actions = actions;
    this.middleware = middleware;
    this.handlerResolver = handlerResolver;
    this.handlerComposer = handlerComposer;
    this.contextFactory = contextFactory;
  }

  public async run(
    service: IService,
    action: string,
    params?: IParams,
    meta?: IMeta,
  ) {
    const handler = this.getHandlerToRun(action);
    const ctx = this.contextFactory.createContext(service, action, params, meta);

    return handler(ctx);
  }

  private getHandlerToRun(action: string) {
    if (!this.resolvedActionHandlers[action]) {
      const handler = this.actions.getAction(action).handler;
      const middleware = this.middleware.getAllMiddleware(action);
      const handlers = [...middleware, handler];
      const resolvedHandlers = handlers.map((h) => {
        return this.handlerResolver.resolve(h);
      });

      this.resolvedActionHandlers[action] = this.handlerComposer.compose(resolvedHandlers);
    }

    return this.resolvedActionHandlers[action];
  }

}
