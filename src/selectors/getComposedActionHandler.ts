import { createSelector } from 'reselect';
import compose from '../utils/compose';
import getActionHandler from './getActionHandler';
import getActionMiddleware from './getActionMiddleware';
import getAllMiddleware from './getAllMiddleware';

const getComposedActionHandler = createSelector(
  getAllMiddleware,
  getActionMiddleware,
  getActionHandler,
  (allMiddleware, actionMiddleware, actionHandler) => {
    const handlers = [...allMiddleware, ...actionMiddleware, actionHandler];
    return compose(handlers);
  },
);

export default getComposedActionHandler;
