import { IAction, IHandler } from './types';
import validateActionSpec from './utils/validateActionSpec';

export default class Action implements IAction {

  public name: string;
  public handler: IHandler;
  public type: string;
  public version: string;
  public description: string;
  public meta: {
    [key: string]: any;
  };

  constructor(spec: IAction) {
    validateActionSpec(spec);
    this.name = spec.name;
    this.handler = spec.handler;
    this.type = spec.type || 'action';
    this.version = spec.version || '1.0';
    this.description = spec.description || '';
    this.meta = spec.meta || {};
  }

}
