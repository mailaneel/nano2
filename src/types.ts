export interface IParams {
  [key: string]: any;
}

export interface IMeta {
  timestamp?: number;
  requestId?: string;
  correlationId?: string;
  from?: string;
  [key: string]: any;
}

export interface IContext {
  service: IService;
  action: string;
  instanceId: string;
  fromInstanceId?: string;
  timestamp: number;
  requestId: string;
  correlationId?: string;
  from?: string;
  params: IParams;
  level: number;
  meta: IMeta;
  [key: string]: any;
  call(action: string, params?: IParams, attributes?: IMeta): Promise<any>;
}

export type IHandler = (ctx: IContext, next?: () => any) => any;

export interface IAction {
  name: string;
  handler: IHandler;
  type?: string;
  version?: string;
  description?: string;

  meta?: {
    [key: string]: any;
  };
}

export interface IActionMap {
  [actionName: string]: IAction;
}

export interface IActions {
  addAction(spec: IAction): IActions;
  hasAction(name: string): boolean;
  getActions(): IActionMap;
  getAction(name: string): IAction;
}

export type IPluginRegiser = (service: IService) => Promise<void>;

export interface IPlugin {
  name: string;
  register: IPluginRegiser;
}

export interface IPluginMap {
  [pluginName: string]: IPlugin;
}

export interface IPlugins {
  addPlugin(spec: IPlugin): IPlugins;
  hasPlugin(name: string): boolean;
  getPlugins(): IPluginMap;
  getPlugin(name: string): any;
}

export interface IMiddlewareMap {
  [action: string]: IHandler[];
}

export interface IMiddleware {
  addMiddleware(action: string | IHandler, middleware?: IHandler);
  getAllMiddleware(action: string): IHandler[];
}

export interface IHandlerComposer {
  compose(handlers: IHandler[]): (ctx: IContext) => any;
}

export interface IHandlerResolver {
  resolve(handler: IHandler): IHandler;
}

export interface IContextFactory {
  createContext(
    service: IService,
    action: string,
    params?: IParams,
    attributes?: IMeta,
  ): IContext;
}

export interface IActionRunner {
  run(
    service: IService,
    action: string,
    params?: IParams,
    attributes?: IMeta,
  ): Promise<any>;
}

export interface IServiceConfig {
  name?: string;
  actions: IActions;
  plugins: IPlugins;
  middleware: IMiddleware;
  runner: IActionRunner;
}

export interface IService {
  id: string;
  name: string;
  actions: IActions;
  plugins: IPlugins;
  middleware: IMiddleware;
  config: IServiceConfig;

  action(action: string | IAction, handler?: IHandler): IService;
  use(action: string | IHandler | IHandler[], handler?: IHandler | IHandler[]): IService;
  register(spec: IPlugin | IPlugin[]): IService;
  call(action: string, params?: IParams, attributes?: IMeta): Promise<any>;
  start(): Promise<void>;
}
