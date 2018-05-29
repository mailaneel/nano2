import Context from '../Context';

const action = 'test-action';
const params = { a: 1, b: 2 };
const emptyParams = {};
const emptyMeta = {};

describe('Context', () => {

  it('should throw if action is not provided', () => {
    expect(() => new Context(null)).toThrow(TypeError);
  });

  it('should have all interface methods and properties', () => {
    const context = new Context(action);
    expect(context.action).toBeDefined();
    expect(context.correlationId).toBeDefined();
    expect(context.requestId).toBeDefined();
    expect(context.from).toBeDefined();
    expect(context.params).toBeDefined();
    expect(context.timestamp).toBeDefined();
  });

  it('should create with defaults', () => {
    const context = new Context(action);
    expect(context.action).toBe(action);
    expect(context.params).toEqual({});
    expect(context.meta).toEqual({});
    expect(context.timestamp).toBeGreaterThan(0);
    expect(typeof context.requestId).toBe('string');
    expect(context.correlationId).toBeNull();
    expect(context.from).toBeNull();
  });

  it('should create with given action', () => {
    const context = new Context(action);
    expect(context.action).toBe(action);
  });

  it('should create with given params', () => {
    const context = new Context(action, params);
    expect(context.params).toBe(params);
  });

  it('should create with given meta', () => {
    const context = new Context(action, params, emptyMeta);
    expect(context.meta).toBe(emptyMeta);
  });

  it('should use correlationId if passed in meta', () => {
    const context = new Context(action, params, {
      correlationId: '12345',
    });
    expect(context.correlationId).toBe('12345');
  });

  it('should use from if passed in meta', () => {
    const context = new Context(action, params, {
      from: 'some.service',
    });
    expect(context.from).toBe('some.service');
  });

});
