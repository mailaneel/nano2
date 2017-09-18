import Plugin from './Plugin';
import { IPlugin, IPluginMap, IPlugins } from './types';

const duplicatePlugin = plugin => new Error(`${ plugin } plugin already exist.`);
const pluginNotFound = plugin => new Error(`${ plugin } plugin does not exist.`);

export default class Plugins implements IPlugins {

  private plugins: IPluginMap = {};

  public addPlugin(spec: IPlugin) {
    if (this.hasPlugin(spec.name)) {
      throw duplicatePlugin(spec.name);
    }

    this.plugins[spec.name] = new Plugin(spec);
    return this;
  }

  public hasPlugin(name: string): boolean {
    return !!this.plugins[name];
  }

  public getPlugins(): IPluginMap {
    return this.plugins;
  }

  public getPlugin(name: string): IPlugin {
    if (!this.hasPlugin(name)) {
      throw pluginNotFound(name);
    }

    return this.plugins[name];
  }
}
