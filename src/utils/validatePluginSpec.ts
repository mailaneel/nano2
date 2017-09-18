import { IPlugin } from '../types';

export default (spec: IPlugin) => {
  if (!spec || typeof spec !== 'object') {
    throw new Error('spec should be of type object');
  }

  if (!spec.name) {
    throw new Error('spec is missing name key');
  }

  if (!spec.register) {
    throw new Error('spec is missing register key');
  }
};
