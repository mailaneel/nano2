import { SERVICE_ERROR } from '../constants';

export default  (payload) => {
  return {
    payload,
    error: true,
    type: SERVICE_ERROR,
  };
};
