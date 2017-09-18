import Context from './Context';
import {
  IAttributes,
  IContext,
  IContextFactory,
  IParams,
} from './types';

export default class ContextFactory implements IContextFactory {

  public createContext(
    action: string,
    params?: IParams,
    attributes?: IAttributes,
  ): IContext {
    return new Context(
      action,
      params,
      attributes,
    );
  }

}
