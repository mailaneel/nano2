import { createSelector } from 'reselect';
import getMiddleware from './getMiddleware';

const getActionMiddleware = createSelector(
  getMiddleware,
  (_, actionName) => actionName,
  (middleware, actionName) =>  middleware[actionName] || [],
);

export default getActionMiddleware;
