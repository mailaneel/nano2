import { ACTION_ADD } from '../constants';
import { IAction } from '../types';
import validateActionSpec from '../utils/validateActionSpec';

export const createAction = (state, payload) => {
  validateActionSpec(payload);

  const {
      name,
    handler,
    type = 'action',
    version = '1.0',
    description = '',
    meta = {},
    } = payload;

  return {
    ...state,
    [name]: {
      name,
      handler,
      type,
      version,
      description,
      meta,
    },
  };
};

export default (state = {}, action: {
  type: string;
  payload: IAction;
}) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_ADD:
      return createAction(state, payload);
    default:
      return state;
  }
};
