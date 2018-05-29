import Context from './Context';
import {
  IContext,
  IContextFactory,
  IMeta,
  IParams,
  IService,
} from './types';

export default class ContextFactory implements IContextFactory {

  public createContext(
    service: IService,
    action: string,
    params?: IParams,
    meta?: IMeta,
  ): IContext {
    return new Context(
      service,
      action,
      params,
      meta,
    );
  }

}
