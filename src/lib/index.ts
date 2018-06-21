import * as path from 'path';
import * as mount from 'roas-mount';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import { router } from './router';
import { config } from '../config/config';

let provider = config.http.provider || '';

/*
 *加载控制器
 * param:dir(控制器文件目录,默认路径为当前项目src/api/controllers)
 */
global['$controllers'] = mount(path.join(__dirname, '../', 'api/controllers', provider));

/*
 *加载路由
 * 控制器动态注册路由
 */
const koaRouter = new KoaRouter();

export default function (ctx?: Koa.Context) {
    const routes = router.getRouter();
    Object.keys(routes).forEach((url) => {
        routes[url].forEach((object) => {
            if (ctx && object.httpMethod === 'ws') {
                const instance = new object.constructor(ctx);
                ctx.socket.on((object.constructor.url || '') + url, instance[object.handler]);
            } else if (object.httpMethod !== 'ws') {
                koaRouter[object.httpMethod]((object.constructor.url || '') + url, async (ctx: Koa.BaseContext) => {
                    const instance = new object.constructor(ctx);
                    await instance[object.handler]();
                });
            }
        });
    });
    return koaRouter;
}