import path from 'path';
import { applyMiddleware } from 'graphql-middleware';
import { makeSchema } from '@nexus/schema';
import { nexusPrismaPlugin } from 'nexus-prisma';
import { GraphQLSchemaWithFragmentReplacements } from 'graphql-middleware/dist/types';

import * as User from './User';
import * as Todo from './Todo';
import * as authResolver from '../resolvers/authResolver';
import * as todoResolver from '../resolvers/todoResolver';
import * as userResolver from '../resolvers/userResolver';
import * as Enums from '../enums';

const schema = makeSchema({
  types: [User, Todo, authResolver, todoResolver, userResolver, Enums],
  plugins: [
    nexusPrismaPlugin({
      outputs: {
        typegen: path.join(__dirname, '..', '..', '@types', 'nexus-prisma', 'index.d.ts'),
      },
    }),
  ],
  outputs: {
    schema: path.join(__dirname, '..', 'generated', 'schema.graphql'),
    typegen: path.join(__dirname, '..', '..', '@types', 'nexus-typegen', 'index.d.ts'),
  },
  typegenAutoConfig: {
    contextType: 'ctx.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prismaClient',
      },
      {
        source: require.resolve('../context'),
        alias: 'ctx',
      },
    ],
  },
});

let schemaWithMiddleware: GraphQLSchemaWithFragmentReplacements;
if (process.env.TRANSPILE_ONLY) {
  schemaWithMiddleware = applyMiddleware(schema);
} else {
  const permissions = require('../middlewares/permissions');
  schemaWithMiddleware = applyMiddleware(schema, permissions.default);
}

export default schemaWithMiddleware;
