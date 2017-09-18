import {
  IHandler,
  IHandlerResolver,
} from './types';

export default class HandlerResolver implements IHandlerResolver {

  public resolve(handler: IHandler): IHandler {
    return handler;
  }

}
