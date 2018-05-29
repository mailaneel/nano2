import { IContext, IMeta, IParams, IService } from './types';
import { getTimeUUID } from './utils/uuid';

export default class Context implements IContext {

  public service: IService;
  public action: string;
  public instanceId: string;
  public fromInstanceId?: string;
  public timestamp: number;
  public requestId: string;
  public correlationId?: string;
  public from?: string;
  public params: IParams;
  public meta: IMeta;
  public level: number;

  constructor(
    service: IService,
    action: string,
    params: IParams = {},
    meta: IMeta = {},
  ) {
    if (!action || typeof action !== 'string') {
      throw new TypeError('action is required parameter and should be of type string');
    }

    this.service = service;
    this.action = action;
    this.instanceId = this.service.id;
    this.fromInstanceId = meta.fromInstanceId || null;
    this.timestamp = Date.now();
    this.requestId = getTimeUUID();
    this.correlationId = meta.correlationId || null;
    this.from = meta.from || this.service.name;
    this.level = meta.level || 1;
    this.params = params;
    this.meta = meta;
  }

  async call(action: string, params?: IParams, meta?: IMeta) {
    return this.service.call(action, params, {
      ...meta,
      correlationId: this.correlationId || this.requestId,
      from: this.service.name,
      fromInstanceId: this.instanceId,
      level: this.level + 1,
    });
  }

  toJSON() {
    return {
      instanceId: this.service.id,
      fromInstanceId: this.fromInstanceId,
      service: this.service.name,
      action: this.action,
      timestamp: this.timestamp,
      requestId: this.requestId,
      correlationId: this.correlationId,
      from: this.from,
      params: this.params,
      meta: this.meta,
      level: this.level,
    };
  }
}
