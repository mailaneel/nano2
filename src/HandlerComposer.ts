import { IHandler, IHandlerComposer } from './types';
import compose from './utils/compose';

export default class HandlerComposer implements IHandlerComposer {

  public compose(handlers: IHandler[]) {
    return compose(handlers);
  }

}
