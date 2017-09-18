import * as isObject from 'lodash/isObject';
import { IAction } from '../types';

export default (spec: IAction) => {
  if (!spec || !isObject(spec)) {
    throw new Error('spec should be of type object');
  }

  if (!spec.name) {
    throw new Error('spec is missing name key');
  }

  if (!spec.handler) {
    throw new Error('spec is missing handler key');
  }

  if (typeof spec.handler !== 'function') {
    throw new Error('handler key should be of type function');
  }

  if (typeof spec.name !== 'string') {
    throw new Error('name key in spec should be of type string');
  }

  if (spec.type && typeof spec.type !== 'string') {
    throw new Error('type key in spec should be of type string');
  }

  if (spec.version && typeof spec.version !== 'string') {
    throw new Error('version key in spec should be of type string');
  }

  if (spec.description && typeof spec.description !== 'string') {
    throw new Error('description key in spec should be of type string');
  }

  if (spec.meta && !isObject(spec.meta)) {
    throw new Error('meta key in spec should be of type object');
  }
};
