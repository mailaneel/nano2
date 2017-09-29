import { createSelector } from 'reselect';
import getActions from './getActions';

const hasAction = createSelector(
  getActions,
  (_, actionName) => actionName,
  (actions, actionName) =>  !!actions[actionName],
);

export default hasAction;
