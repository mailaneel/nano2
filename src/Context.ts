import { IAttributes, IContext, IParams } from './types';
import { getTimeUUID } from './utils/uuid';

export default class Context implements IContext {

  public action: string;
  public timestamp: number;
  public requestId: string;
  public correlationId?: string;
  public from?: string;
  public params: IParams;
  public attributes: IAttributes;

  constructor(
    action: string,
    params: IParams = {},
    attributes: IAttributes = {},
  ) {
    if (!action || typeof action !== 'string') {
      throw new TypeError('action is required parameter and should be of type string');
    }

    this.action = action;
    this.timestamp = attributes.timestamp || Date.now();
    this.requestId = attributes.requestId || getTimeUUID();
    this.correlationId = attributes.correlationId || null;
    this.from = attributes.from || null;
    this.params = params;
    this.attributes = attributes;
  }

}
