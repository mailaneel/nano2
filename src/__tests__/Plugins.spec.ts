import Plugin from '../Plugin';
import Plugins from '../Plugins';
import { pluginSpecs } from './fixtures/pluginFixtures';

describe('Plugins', () => {
  let plugins = null;

  beforeEach(() => {
    plugins = new Plugins();
  });

  it('should have all interface methods', () => {
    expect(plugins.addPlugin).toBeDefined();
    expect(plugins.getPlugin).toBeDefined();
    expect(plugins.getPlugins).toBeDefined();
    expect(plugins.hasPlugin).toBeDefined();
  });

  describe('addPlugin', () => {

    it('should be able to add plugin using spec', () => {
      const spec: any = pluginSpecs.plugin1;
      plugins.addPlugin(spec);
      expect(plugins.hasPlugin(spec.name)).toBe(true);
      expect(plugins.getPlugin(spec.name)).toBeInstanceOf(Plugin);
    });

    it('should not allow plugin with same name', () => {
      const spec1: any = pluginSpecs.plugin1;
      const spec2: any = pluginSpecs.plugin1;
      plugins.addPlugin(spec1);
      expect(() => plugins.addPlugin(spec2))
      .toThrow(`${spec2.name} plugin already exist.`);
    });

  });

  describe('hasPlugin', () => {

    it('should return false for plugins that does not exist', () => {
      expect(plugins.hasPlugin('non-existent-plugin')).toBe(false);
    });

    it('should return true for plugins that exist', () => {
      const spec: any = pluginSpecs.plugin1;
      plugins.addPlugin(spec);
      expect(plugins.hasPlugin(spec.name)).toBe(true);
    });

  });

  describe('getPlugin', () => {

    it('should return plugin instance when exist', () => {
      const spec: any = pluginSpecs.plugin1;
      plugins.addPlugin(spec);
      expect(plugins.getPlugin(spec.name)).toBeInstanceOf(Plugin);
    });

    it('should throw when plugin does not exist', () => {
      expect(() => plugins.getPlugin('non-existent-plugin'))
      .toThrow('non-existent-plugin plugin does not exist.');
    });

  });

  describe('getPlugins', () => {

    it('should return all added plugins', () => {
      const spec1: any = pluginSpecs.plugin1;
      const spec2: any = pluginSpecs.plugin2;
      expect(Object.keys(plugins.getPlugins()).length).toEqual(0);

      plugins.addPlugin(spec1);
      plugins.addPlugin(spec2);
      const returnedPlugins = plugins.getPlugins();
      expect(Object.keys(returnedPlugins).length).toBe(2);
      expect(returnedPlugins[spec1.name]).toBeInstanceOf(Plugin);
      expect(returnedPlugins[spec2.name]).toBeInstanceOf(Plugin);
    });

  });
});
