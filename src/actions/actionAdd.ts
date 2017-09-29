import { ACTION_ADD } from '../constants';
import { IAction } from '../types';

export default (payload: IAction) => {
  return {
    payload,
    type: ACTION_ADD,
  };
};
