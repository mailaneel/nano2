import { SERVICE_CREATE, SERVICE_ERROR, SERVICE_START } from '../constants';
import { getUUID } from '../utils/uuid';

interface IState {
  id?: string;
  name?: string;
  started?: boolean;
  error?: any;
}

export const createService = (state, payload) => {
  const id = getUUID();
  const name = payload.name || id;
  return {
    id,
    name,
    started: false,
    error: null,
  };
};

export const startService = (state) => {
  return {
    ...state,
    started: true,
  };
};

export const createServiceError = (state, payload) => {
  return {
    ...state,
    started: false,
    error: payload.error,
  };
};

export default (
  state: IState = {},
  action: {
    type: string;
    payload: IState
  },
) => {
  const { type, payload } = action;

  switch (type) {
    case SERVICE_CREATE:
      return createService(state, payload);
    case SERVICE_START:
      return startService(state);
    case SERVICE_ERROR:
      return createServiceError(state, payload);
    default:
      return state;
  }
};
