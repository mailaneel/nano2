import { createSelector } from 'reselect';
import getMiddleware from './getMiddleware';

const getAllMiddleware = createSelector(
  getMiddleware,
  middleware => middleware['*'] || [],
);

export default getAllMiddleware;
