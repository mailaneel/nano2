import { createSelector } from 'reselect';
import getAction from './getAction';

const getActionHandler = createSelector(
  getAction,
  action => action.handler,
);

export default getActionHandler;
