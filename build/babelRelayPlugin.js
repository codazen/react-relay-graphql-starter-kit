const getBabelRelayPlugin = require('babel-relay-plugin');
const schema = require('../server/data/schema.json');

module.exports = getBabelRelayPlugin(schema.data);
