import Plugin from '../Plugin';
import { pluginSpecs } from './fixtures/pluginFixtures';

describe('Plugin', () => {

  it('should have all interface methods', () => {
    const plugin = new Plugin(pluginSpecs.plugin1);
    expect(plugin.name).toBeDefined();
    expect(plugin.register).toBeDefined();
  });

  it('should throw if name and register are not provided in spec', () => {
    expect(() => new Plugin(<any>{})).toThrow();
  });

  it('should throw if name is not provided in spec', () => {
    expect(() => new Plugin(<any>{})).toThrow('spec is missing name key');
  });

  it('should throw if register is not provided in spec', () => {
    expect(() => new Plugin(<any>{ name: 'test' })).toThrow('spec is missing register key');
  });

  it('should use values given in spec', () => {
    const spec = pluginSpecs.plugin1;
    const plugin = new Plugin(spec);
    expect(plugin.name).toBe(spec.name);
    expect(plugin.register).toBe(spec.register);
  });

  describe('register', () => {

    it('should return promise', () => {
      const spec: any = pluginSpecs.plugin1;
      const service: any = {};
      const plugin = new Plugin(spec);

      expect(plugin.register(service)).resolves.toBeNull();
    });

  });
});
