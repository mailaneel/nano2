import Context from './Context';
import {
  IContext,
  IContextFactory,
  IMeta,
  IParams,
} from './types';

export default class ContextFactory implements IContextFactory {

  public createContext(
    action: string,
    params?: IParams,
    meta?: IMeta,
  ): IContext {
    return new Context(
      action,
      params,
      meta,
    );
  }

}
