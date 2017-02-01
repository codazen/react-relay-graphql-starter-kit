/* @flow */

import { fromGlobalId } from 'graphql-relay';

// keep track of types created
const types = {};

// registers a type in the registry with model, type, and single entity lookup function
export const registerType = (model: any, type: any, lookupFn: any) => {
  types[type.name] = { type, model, lookupFn };
};

// return a node based on its type and its lookup function using globalId
export const getNode = (globalId: string) => {
  const { type: typeName, id } = fromGlobalId(globalId);

  if (types[typeName]) {
    return types[typeName].lookupFn(id);
  }
  return null;
};

// returns the node type based on an instance being passed
export const getNodeType = (obj: any) => {
  for (const typeName of Object.keys(types)) { // eslint-disable-line no-restricted-syntax
    if (obj instanceof types[typeName].model) {
      return types[typeName].type;
    }
  }
  return null;
};
