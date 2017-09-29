import { MIDDLEWARE_ADD } from '../constants';
import { IHandler } from '../types';

export const ALL_KEY = '*';

export const addMiddleware = (state, payload) => {
  const actionName = payload.action ? payload.action : ALL_KEY;
  const middleware = [
    ...(state[actionName] || []),
    payload.handler,
  ];

  return {
    ...state,
    [actionName]: middleware,
  };
};

export default (state = {}, action: {
  type: string;
  payload: {
    action?: string;
    handler: IHandler;
  },
}) => {
  const { type, payload } = action;

  switch (type) {
    case MIDDLEWARE_ADD:
      return addMiddleware(state, payload);
    default:
      return state;
  }
};
