import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema';
import { root } from './resolvers';
import cors from 'cors';

const app = express();

app.use(cors());

app.use('/graphql', createHandler({
  schema: schema,
  rootValue: root,
}));

app.listen(4000, () => {
  console.log('ナルト Server is running on port 4000..');
});
