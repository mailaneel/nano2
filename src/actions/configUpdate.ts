import { CONFIG_UPDATE } from '../constants';
import { IAction, IAttributes, IParams } from '../types';

export default  (payload: {
  [key: string]: any;
}) => {
  return {
    payload,
    type: CONFIG_UPDATE,
  };
};
