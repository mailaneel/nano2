import { SERVICE_CREATE } from '../constants';
import { IAction, IAttributes, IParams } from '../types';

export default  (payload: {
  [key: string]: any;
} = {}) => {
  return {
    payload,
    type: SERVICE_CREATE,
  };
};
