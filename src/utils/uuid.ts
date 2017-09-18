import { v1, v4 } from 'uuid';

export {
  v1,
  v4,
};

export const getTimeUUID = () => {
  return v1();
};

export const getUUID = () => {
  return v4();
};
