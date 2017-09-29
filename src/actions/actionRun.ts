import { ACTION_RUN } from '../constants';
import { IAction, IAttributes, IParams } from '../types';

export default (payload: {
  name: string;
  params?: IParams;
  attributes?: IAttributes;
}) => {
  return {
    payload,
    type: ACTION_RUN,
  };
};
