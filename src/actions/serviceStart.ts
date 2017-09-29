import { SERVICE_START } from '../constants';

export default (payload) => {
  return {
    payload,
    type: SERVICE_START,
  };
};
