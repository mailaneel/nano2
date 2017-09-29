import { MIDDLEWARE_ADD } from '../constants';
import { IHandler } from '../types';

export default (payload: {
  action?: string,
  handler: IHandler,
}) => {
  return {
    payload,
    type: MIDDLEWARE_ADD,
  };
};
