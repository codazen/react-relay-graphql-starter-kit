import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import schemaString from './schema.graphql';

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema });

const query = `
query tasksForUser {
  user {
    id
    todos(first: 10) {
      edges {
        node {
          id
          content
        }
      }
    }
  }
}
`;

graphql(schema, query).then(result => console.log('Got result', result, result.data.user.todos.edges)); // eslint-disable-line
