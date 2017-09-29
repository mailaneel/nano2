// tslint:disable import-name
import * as mapValues from 'lodash/mapValues';
import * as merge from 'lodash/merge';
import * as reduceReducers from 'reduce-reducers';
import { applyMiddleware, bindActionCreators, combineReducers, createStore } from 'redux';
import defaultActions from './actions';
import actionRunnerMiddleware from './middleware/actionRunnerMiddleware';
import defaultReducers from './reducers';
import defaultSelectors from './selectors';
import Service from './Service';

export const createReducer = (reducersMap) => {
  return combineReducers(mapValues(reducersMap, (reducers) => {
    return reduceReducers(...reducers);
  }));
};

export const createService = (config) => {
  const {
    actions,
    reducers,
    selectors,
    middleware = [],
    ...restConfig,
   } = config;

  const reducer = createReducer(merge(reducers, defaultReducers));
  const enhancer = applyMiddleware(actionRunnerMiddleware, ...middleware);
  const initialState = merge({}, restConfig);
  const store = createStore(reducer, initialState, enhancer);

  const boundActions = bindActionCreators({
    ...defaultActions,
    ...actions,
    // tslint:disable-next-line:align
  }, store.dispatch);

  const mergedSelectors = {
    ...defaultSelectors,
    ...selectors,
  };

  return new Service({
    store,
    selectors: mergedSelectors,
    actions: boundActions,
  });
};
