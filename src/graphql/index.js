import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import context from './context';

const apolloServer = new ApolloServer({
    schema,
    context
  });

export default apolloServer;
