import actionsReducer from './actionsReducer';
import configReducer from './configReducer';
import middlewareReducer from './middlewareReducer';
import serviceReducer from './serviceReducer';

export default {
  actions: [actionsReducer],
  middleware: [middlewareReducer],
  config: [configReducer],
  service: [serviceReducer],
};
