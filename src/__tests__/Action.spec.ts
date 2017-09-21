import Action from '../Action';
import { actionFullSpecs, actionSpecs } from './fixtures/actionFixtures';

describe('Action', () => {

  it('should have all interface methods', () => {
    const action = new Action(actionSpecs.ping);
    expect(action.name).toBeDefined();
    expect(action.handler).toBeDefined();
    expect(action.type).toBeDefined();
    expect(action.description).toBeDefined();
    expect(action.version).toBeDefined();
    expect(action.meta).toBeDefined();
  });

  it('should throw if handler and name are not provided in spec', () => {
    expect(() => new Action(<any>{})).toThrow();
  });

  it('should throw if name is not provided in spec', () => {
    expect(() => new Action(<any>{})).toThrow('spec is missing name key');
  });

  it('should throw if handler is not provided in spec', () => {
    expect(() => new Action(<any>{ name: 'test' })).toThrow('spec is missing handler key');
  });

  it('should throw if type provided in spec is not string', () => {
    const spec: any = { name: 'test', handler: () => null, type: () => null };
    expect(() => new Action(spec))
      .toThrow('type key in spec should be of type string');
  });

  it('should have initiliaze defaults', () => {
    const spec = actionSpecs.ping;
    const action = new Action(spec);
    expect(action.name).toBe(spec.name);
    expect(action.handler).toBe(spec.handler);
    expect(action.type).toBe('action');
    expect(action.description).toBe('');
    expect(action.version).toBe('1.0');
    expect(action.meta).toEqual({});
  });

  it('should use values given in spec', () => {
    const spec = actionFullSpecs.ping;
    const action = new Action(spec);
    expect(action.name).toBe(spec.name);
    expect(action.handler).toBe(spec.handler);
    expect(action.type).toBe(spec.type);
    expect(action.description).toBe(spec.description);
    expect(action.version).toBe(spec.version);
    expect(action.meta).toEqual({});
  });

});
