import { createSelector } from 'reselect';
import getConfig from './getConfig';

const getConfigByName = createSelector(
  getConfig,
  (_, configName) => configName,
  (config, configName) => config[configName],
);

export default getConfigByName;
