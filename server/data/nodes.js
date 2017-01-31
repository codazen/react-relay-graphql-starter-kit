/* @flow */

import { nodeDefinitions } from 'graphql-relay';
import { getNode, getNodeType } from './typeRegistry';

const { nodeInterface, nodeField } = nodeDefinitions(getNode, getNodeType);

// nodeInterface is used in the interfaces property of each type
// nodeField is used to set the node property of the root query
module.exports = { nodeInterface, nodeField };
