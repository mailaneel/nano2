import ActionRunner from './ActionRunner';
import Actions from './Actions';
import ContextFactory from './ContextFactory';
import HandlerComposer from './HandlerComposer';
import HandlerResolver from './HandlerResolver';
import Middleware from './Middleware';
import Plugins from './Plugins';
import Service from './Service';
import {
  IService,
  IServiceConfig,
} from './types';

export const createActionRunner = ({
  actions,
  middleware,
}) => {
  return new ActionRunner(
    actions,
    middleware,
    new HandlerResolver(),
    new HandlerComposer(),
    new ContextFactory(),
  );
};

export const createMiddlewareManager = () => {
  return new Middleware();
};

export const createActionManager = () => {
  return new Actions();
};

export const createPluginManager = () => {
  return new Plugins();
};

export const createService = (config: Partial<IServiceConfig> = {}): IService => {
  const name = config.name;
  const logger = config.logger || console;
  const plugins = config.plugins || createPluginManager();
  const middleware = config.middleware || createMiddlewareManager();
  const actions = config.actions || createActionManager();
  const runner = config.runner || createActionRunner({
    actions,
    middleware,
  });

  return new Service({
    name,
    plugins,
    middleware,
    actions,
    runner,
    logger,
  });
};
