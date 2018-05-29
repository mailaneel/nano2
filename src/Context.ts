import { IContext, IMeta, IParams } from './types';
import { getTimeUUID } from './utils/uuid';

export default class Context implements IContext {

  public action: string;
  public timestamp: number;
  public requestId: string;
  public correlationId?: string;
  public from?: string;
  public params: IParams;
  public meta: IMeta;

  constructor(
    action: string,
    params: IParams = {},
    meta: IMeta = {},
  ) {
    if (!action || typeof action !== 'string') {
      throw new TypeError('action is required parameter and should be of type string');
    }

    this.action = action;
    this.timestamp = meta.timestamp || Date.now();
    this.requestId = meta.requestId || getTimeUUID();
    this.correlationId = meta.correlationId || null;
    this.from = meta.from || null;
    this.params = params;
    this.meta = meta;
  }

}
