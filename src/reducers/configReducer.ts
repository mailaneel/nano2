import * as merge from 'lodash/merge';
import { CONFIG_UPDATE } from '../constants';

const updateConfig = (state, payload) => {
  return merge({}, state, payload);
};

export default (state = {}, action: {
  type: string;
  payload: { [key: string]: any };
}) => {
  const { type, payload } = action;

  switch (type) {
    case CONFIG_UPDATE:
      return updateConfig(state, payload);
    default:
      return state;
  }
};
