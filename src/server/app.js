import 'babel-polyfill';//使用到async await必须引入，最好在第一行
import Koa from 'koa';
import logger from 'koa-logger';
import serve from 'koa-static';
import convert from 'koa-convert';
import views from 'koa-views';
import mongo from 'koa-mongo';
import koaBody from 'koa-bodyparser';
import historyApiFallback from "koa-history-api-fallback";
import CONFIG from './config/config.js';
import router from './controller/controllerInit';

const app = new Koa();

// 日志
app.use(logger())

app.use(async(ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.body = {
      msg: err.msg
    };
    ctx.status = err.status || 500;
  }
});

// 静态文件
const publicFiles = convert(serve(CONFIG.get('staticDir')));
publicFiles._name = 'static';
app.use(publicFiles);

// view文件 
app.use(views(CONFIG.get('viewsDir')));

// mongo
app.use(mongo({
  db: CONFIG.get('dbName'),
}));


// app.use(convert(historyApiFallback()));

// 请求body解析
app.use(koaBody());

// 路由
app
  .use(router.routes())
  .use(router.allowedMethods());

const port = CONFIG.get('port');

app.listen(port, () => {
  console.log(`serve running in http://localhost:${port}`);
});

export {
  app
}