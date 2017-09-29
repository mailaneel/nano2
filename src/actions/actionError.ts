import { ACTION_ERROR } from '../constants';
import { IAction, IAttributes, IParams } from '../types';

export default (payload: {
  name: string;
  params?: IParams;
  attributes?: IAttributes;
}) => {
  return {
    payload,
    error: true,
    type: ACTION_ERROR,
  };
};
