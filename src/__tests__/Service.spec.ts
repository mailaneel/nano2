import Service from '../Service';
import { createService } from '../ServiceFactory';
import { actionFullSpecs, actionSpecs } from './fixtures/actionFixtures';
import { pluginSpecs } from './fixtures/pluginFixtures';

describe('Service', () => {
  let service = null;

  beforeEach(() => {
    service = createService();
  });

  it('should have all interface methods and properties', () => {
    expect(service.actions).toBeDefined();
    expect(service.plugins).toBeDefined();
    expect(service.middleware).toBeDefined();
    expect(service.id).toBeDefined();
    expect(service.name).toBeDefined();
    expect(service.call).toBeDefined();
    expect(service.action).toBeDefined();
    expect(service.use).toBeDefined();
    expect(service.register).toBeDefined();
    expect(service.start).toBeDefined();
  });

  describe('action', () => {

    it('should add action using key, handler', () => {
      const spec = actionSpecs.ping;
      service.action(spec.name, spec.handler);
      const action = service.actions.getAction(spec.name);
      expect(action.name).toBe(spec.name);
      expect(action.handler).toBe(spec.handler);
    });

    it('should add action using action spec', () => {
      const actionsTotal = Object.keys(actionFullSpecs);
      service.action(actionFullSpecs);
      Object.keys(actionFullSpecs).forEach((actionName) => {
        expect(service.actions.hasAction(actionName)).toBeTruthy();
      });
    });

    it('should add action using action map', () => {
      const spec = actionSpecs.ping;
      service.action(spec);
      const action = service.actions.getAction(spec.name);
      expect(action.name).toBe(spec.name);
      expect(action.handler).toBe(spec.handler);
    });

    it('should add action using action spec with optional parameters', () => {
      const spec = actionFullSpecs.ping;

      service.action(spec);
      const action = service.actions.getAction(spec.name);
      expect(action.name).toBe(spec.name);
      expect(action.version).toBe(spec.version);
      expect(action.description).toBe(spec.description);
      expect(action.type).toBe(spec.type);
      expect(action.handler).toBe(spec.handler);
    });

    it('should return service instance for chaining', () => {
      expect(service.action(actionFullSpecs.ping)).toBeInstanceOf(Service);
    });

  });

  describe('use', () => {

    it('should add middleware using action, handler', () => {
      const handler = () => null;
      service.use('ping', handler);
      const middleware = service.middleware.getAllMiddleware('ping');
      expect(middleware[0]).toBe(handler);
    });

    it('should add middleware using action, handlers array', () => {
      const handler1 = () => null;
      const handler2 = () => null;
      service.use('ping', [handler1, handler2]);
      const middleware = service.middleware.getAllMiddleware('ping');
      expect(middleware[0]).toBe(handler1);
      expect(middleware[1]).toBe(handler2);
    });

    it('should add all middleware', () => {
      const handler1 = () => null;
      const handler2 = () => null;
      service.use(handler1);
      service.use('ping', handler2);
      const middleware = service.middleware.getAllMiddleware('ping');
      expect(middleware[0]).toBe(handler1);
      expect(middleware[1]).toBe(handler2);
    });

    it('should return service instance for chaining', () => {
      expect(service.action(actionFullSpecs.ping)).toBeInstanceOf(Service);
    });

  });

  describe('register', () => {

    it('should add plugin', () => {
      service.register(pluginSpecs.plugin1);
      expect(service.plugins.hasPlugin(pluginSpecs.plugin1.name)).toBe(true);
    });

    it('should add plugin array', () => {
      service.register([pluginSpecs.plugin1, pluginSpecs.plugin2]);
      expect(service.plugins.hasPlugin(pluginSpecs.plugin1.name)).toBe(true);
      expect(service.plugins.hasPlugin(pluginSpecs.plugin2.name)).toBe(true);
    });

    it('should return service instance for chaining', () => {
      expect(service.action(actionFullSpecs.ping)).toBeInstanceOf(Service);
    });

  });

  describe('call', () => {

    it('should call the action', async () => {
      service.action(actionSpecs.ping);
      service.action(actionSpecs.version);
      service.action(actionSpecs['math.add']);
      service.action(actionSpecs['math.multiply']);
      expect.assertions(4);

      await expect(service.call('ping')).resolves.toBe('pong');
      await expect(service.call('version')).resolves.toBe('1.0');
      await expect(service.call('math.add', { a: 5, b: 5 })).resolves.toBe(10);
      await expect(service.call('math.multiply', { a: 5, b: 2 })).resolves.toBe(10);
    });

  });

  describe('start', () => {

    it('should return promise which resolves if no plugins exist', () => {
      expect(service.start()).resolves.toBeUndefined();
    });

    it('should return promise which resolves after all plugins resolve', () => {
      service.register(pluginSpecs.plugin1);
      expect(service.start()).resolves.toBeUndefined();
    });

  });

});
