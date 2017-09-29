import { createSelector } from 'reselect';
import getActions from './getActions';

const getAction = createSelector(
  getActions,
  (_, actionName) => actionName,
  (actions, actionName) => actions[actionName],
);

export default getAction;
