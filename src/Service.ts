import * as isObject from 'lodash/isObject';
import {
  IAction,
  IActionRunner,
  IActions,
  IAttributes,
  IHandler,
  IMiddleware,
  IParams,
  IPlugin,
  IPlugins,
  IService,
  IServiceConfig,
} from './types';
import { getUUID } from './utils/uuid';

export default class Service implements IService {

  public id: string;
  public name: string;
  public actions: IActions;
  public plugins: IPlugins;
  public middleware: IMiddleware;
  private runner: IActionRunner;
  private config: IServiceConfig;
  private startPromise: Promise<any> = null;

  constructor(config: IServiceConfig) {
    this.config = config;
    this.id = getUUID();
    this.name = config.name || getUUID();
    this.actions = config.actions;
    this.plugins = config.plugins;
    this.middleware = config.middleware;
    this.runner = config.runner;
  }

  public action(action: string | IAction, handler?: IHandler) {
    if (arguments.length === 1 && isObject(action)) {
      this.actions.addAction(<IAction>action);
    } else {
      this.actions.addAction(<IAction>{
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
      handlers.forEach(h => this.middleware.addMiddleware(action, h));
    } else {
      handlers = handlers.concat(action);
      handlers.forEach(h => this.middleware.addMiddleware(h));
    }

    return this;
  }

  public register(plugin: IPlugin | IPlugin[]) {
    const plugins = [].concat(plugin);
    plugins.forEach((plug) => {
      this.plugins.addPlugin(plug);
    });

    return this;
  }

  public async run(action: string, params?: IParams, attributes?: IAttributes) {
    return this.runner.run(action, params, attributes);
  }

  public async start() {
    if (!this.startPromise) {
      const plugins = Object.values(this.plugins.getPlugins());
      const promises = plugins.map(plugin => plugin.register(this));
      this.startPromise = Promise.all(promises).then(() => Promise.resolve());
    }

    return this.startPromise;
  }

}
