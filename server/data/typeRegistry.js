/* @flow */

import { fromGlobalId } from 'graphql-relay';

const types = {};

export const registerType = (model: any, type: any, lookupFn: any) => {
  types[type.name] = { type, model, lookupFn };
};

export const getNode = (globalId: string) => {
  const { type: typeName, id } = fromGlobalId(globalId);

  if (types[typeName]) {
    return types[typeName].lookupFn(id);
  }
  return null;
};

export const getNodeType = (obj: any) => {
  for (const typeName of Object.keys(types)) { // eslint-disable-line no-restricted-syntax
    if (obj instanceof types[typeName].model) {
      return types[typeName].type;
    }
  }

  return null;
};
