import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { createConnection } from 'typeorm'
import jwtMid from 'koa-jwt'
import 'reflect-metadata'

import { unProtectedRouter, protectedRouter} from './routes'
import { JWT_SECRET } from './utils/constants';

createConnection()
  .then(() => {
    // 初始化 Koa 应用实例
    const app = new Koa();

    // 注册中间件
    app.use(cors());
    app.use(bodyParser());

    app.use(async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        ctx.status = err.status || 500
        ctx.body = {message: err.message} //统一成 JSON 格式
      }
    })

    // 响应用户请求
    app.use(unProtectedRouter.routes()).use(unProtectedRouter.allowedMethods());

    // 注册 JWT 中间件
    app.use(jwtMid({ secret: JWT_SECRET }).unless({ method: 'GET' }))

    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

    // 运行服务器
    app.listen(3000);
  })
  .catch((error: string) => console.log(`TypeORM connection err: ${error}`))
