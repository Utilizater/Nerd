import { ApolloServer, gql } from 'apollo-server';
import Query from './graphQl/resolvers/Query';
import Mutation from './graphQl/resolvers/Mutation';
import connection from './dbConnection';
import fs from 'fs';

const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat('/graphQl/schema.graphql'), 'utf8')}
`;

const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { connection },
});

server
  .listen({
    port: 9000,
  })
  .then((serverInfo) => {
    console.log(`Apollo server running at ${serverInfo.url}`);
  });

/*const connection = require('./dbConnection/index');

connection.query('SELECT id FROM `dictionary`', function (
  error,
  results,
  fields
) {
  if (error) throw error;
  console.log('The solution is: ', results[0].id);
});
*/
