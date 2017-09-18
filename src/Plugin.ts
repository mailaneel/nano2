import { IPlugin, IPluginRegiser } from './types';
import validatePluginSpec from './utils/validatePluginSpec';

export default class Plugin implements IPlugin {

  public name: string;
  public register: IPluginRegiser;

  constructor(spec: IPlugin) {
    validatePluginSpec(spec);
    this.name = spec.name;
    this.register = spec.register;
  }

}
