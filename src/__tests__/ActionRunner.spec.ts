import ActionRunner from '../ActionRunner';
import Actions from '../Actions';
import ContextFactory from '../ContextFactory';
import HandlerComposer from '../HandlerComposer';
import HandlerResolver from '../HandlerResolver';
import Middleware from '../Middleware';
import { createService } from '../ServiceFactory';
import { actionFullSpecs, actionSpecs } from './fixtures/actionFixtures';

describe('ActionRunner', () => {
  let actions = null;
  let middleware = null;
  let handlerResolver = null;
  let handlerComposer = null;
  let contextFactory = null;
  let runner = null;
  let service = null;

  beforeEach(() => {
    actions = new Actions();
    middleware = new Middleware();
    handlerResolver = new HandlerResolver();
    handlerComposer = new HandlerComposer();
    contextFactory = new ContextFactory();
    service = createService({ name: 'test' });

    runner = new ActionRunner(
      actions,
      middleware,
      handlerResolver,
      handlerComposer,
      contextFactory,
    );
  });

  it('should have all interface methods and properties', () => {
    expect(runner.run).toBeDefined();
  });

  describe('run', () => {

    it('should run the action with given name', async () => {
      actions.addAction(actionSpecs.ping);
      expect.assertions(1);
      await expect(runner.run(service, 'ping')).resolves.toBe('pong');
    });

    it('should run the action with middleware', async () => {
      const mockMiddleware = jest.fn((ctx, next) => {
        return next();
      });
      actions.addAction(actionSpecs.ping);
      middleware.addMiddleware('ping', mockMiddleware);
      expect.assertions(1);
      await expect(runner.run(service, 'ping')).resolves.toBe('pong');
    });

  });
});
