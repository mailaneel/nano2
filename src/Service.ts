import * as isObject from 'lodash/isObject';
import {
  IAction,
  IActionMap,
  IActionRunner,
  IActions,
  IHandler,
  IMeta,
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
  public config: IServiceConfig;
  private runner: IActionRunner;
  private startPromise: Promise<any>;

  constructor(config: IServiceConfig) {
    this.config = config;
    this.id = getUUID();
    this.name = this.config.name || this.id;
    this.actions = this.config.actions;
    this.plugins = this.config.plugins;
    this.middleware = this.config.middleware;
    this.runner = this.config.runner;
  }

  public action(action: string | IAction | IActionMap, handler?: IHandler) {
    if (arguments.length === 1 && isObject(action)) {
      if ((<IAction>action).handler && (<IAction>action).name) {
        // add action from action spec
        this.actions.addAction(<IAction>action);
      } else {
        // add actions from action map
        const actions = Object.keys(<IActionMap>action);
        actions.forEach((actionName) => {
          this.actions.addAction((<IActionMap>action)[actionName]);
        });
      }
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

  public async run(action: string, params?: IParams, meta?: IMeta) {
    return this.runner.run(action, params, meta);
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
