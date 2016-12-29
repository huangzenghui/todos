import Router from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';
import schema from '../data/schema';
import index from './indexController.js';

const router = new Router();

router
  .get('/', index.index())
  .get('/index', index.index())
  .get('/index.html', index.index())
  .all('/graphql', graphqlKoa((ctx) => {
    return { 
      schema,
      context: { mongo: ctx.mongo },
      debug: true,
    };
  }))
  .get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

export default router;