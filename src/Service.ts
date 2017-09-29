import * as isObject from 'lodash/isObject';
import {
  IAction,
  IAttributes,
  IConfig,
  IHandler,
  IParams,
  IService,
} from './types';

export default class Service {

  public actions;
  public selectors;
  public store;

  constructor(config: IConfig) {
    this.actions = config.actions;
    this.store = config.store;
    this.selectors = config.selectors;
    this.actions.serviceCreate();
  }

  public action(action: string | IAction, handler?: IHandler) {
    if (arguments.length === 1 && isObject(action)) {
      this.actions.actionAdd(<IAction>action);
    } else {
      this.actions.actionAdd(<IAction>{
        handler,
        name: action,
      });
    }

    return this;
  }

  public use(action: string | IHandler | IHandler[], handler?: IHandler | IHandler[]) {
    let handlers = [];

    if (typeof action === 'string') {
      handlers = handlers.concat(handler);
      handlers.forEach(h => this.actions.actionMiddlewareAdd(action, h));
    } else {
      handlers = handlers.concat(action);
      handlers.forEach(h => this.actions.actionMiddlewareAdd(h));
    }

    return this;
  }

  public async run(action: string, params?: IParams, attributes?: IAttributes) {
    return this.actions.actionRun({ action, params, attributes });
  }

  public async start() {
    if (this.selectors.isServiceStarted(this.store.getState())) {
      return;
    }

    return this.actions.serviceStart();
  }

}
