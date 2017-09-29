export interface IParams {
  [key: string]: any;
}

export interface IAttributes {
  timestamp?: number;
  requestId?: string;
  correlationId?: string;
  from?: string;
  [key: string]: any;
}

export interface IContext {
  action: string;
  requestId: string;
  timestamp: number;
  correlationId?: string;
  from?: string;
  params: IParams;
  attributes: IAttributes;
  [key: string]: any;
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

export interface IConfig {
  actions: any;
  selectors: any;
  store: any;
}

export interface IService {
  actions: any;
  selectors: any;
  store: any;

  action(action: string | IAction, handler?: IHandler): IService;
  use(action: string | IHandler | IHandler[], handler?: IHandler | IHandler[]): IService;
  run(action: string, params?: IParams, attributes?: IAttributes): Promise<any>;
  start(): Promise<void>;
}
