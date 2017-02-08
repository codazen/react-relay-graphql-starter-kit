import { makeExecutableSchema, addMockFunctionsToSchema, MockList } from 'graphql-tools';
import { graphql } from 'graphql';
import casual from 'casual';
import schemaString from './schema.graphql';

casual.seed(123);

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

const mocks = {
  User: () => ({
    // a list of length between 2 and 6
    id: () => casual.integer(0, 1000).toString(),
  }),
  TodoConnection: () => ({
    edges: () => new MockList(10),
  }),
  Todo: () => ({
    id: () => casual.integer(0, 1000).toString(),
    content: () => casual.string,
  }),
};

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema, mocks });

const query = `
query TodoList {
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

graphql(schema, query).then(result => { console.log('Got result', result, result.data.user.todos.edges)}); // eslint-disable-line
