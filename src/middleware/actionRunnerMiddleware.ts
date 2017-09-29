import Context from '../Context';
import getComposedActionHandler from '../selectors/getComposedActionHandler';

export default  store => next => (action) => {
  if (action.type !== 'ACTION_RUN') {
    return next(action);
  }

  const handler = getComposedActionHandler(store.getState(), action.payload.action);
  const context = new Context(
    action.payload.action,
    action.payload.params,
    action.payload.attributes,
  );
  store.dispatch({ type: 'ACTION_RUN_START', payload: action.payload });
  store.dispatch({ type: 'ACTION_RUN_FINISH', payload: action.payload });
  return handler(context);
};
