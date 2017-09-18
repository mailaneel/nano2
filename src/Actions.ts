import Action from './Action';
import { IAction, IActionMap, IActions } from './types';

const duplicateAction = name => new Error(`${name} action already exist.`);
const actionNotFound = name => new Error(`${name} action does not exist.`);

export default class Actions implements IActions {

  private actions: IActionMap = {};

  public addAction(spec: IAction) {
    if (this.hasAction(spec.name)) {
      throw duplicateAction(spec.name);
    }

    this.actions[spec.name] = new Action(spec);
    return this;
  }

  public hasAction(name: string): boolean {
    return !!this.actions[name];
  }

  public getActions(): IActionMap {
    return this.actions;
  }

  public getAction(name: string): IAction {
    if (!this.hasAction(name)) {
      throw actionNotFound(name);
    }

    return this.actions[name];
  }
}
