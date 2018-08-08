import * as Koa from 'koa';

export default function (callback) {
    return async (ctx: Koa.Context, next: Function) => {
        try {
            if (ctx.method === 'POST' && ctx.is('text/xml')) {
                let promise = new Promise((resolve, reject) => {
                    let buf = '';
                    ctx.req.setEncoding('utf8');
                    ctx.req.on('data', (chunk) => {
                        buf += chunk;
                    });
                    ctx.req.on('end', () => {
                        resolve(buf);
                    });
                });

                await promise.then(async (result) => {
                    ctx.request.body = result;
                    await next();
                }).catch((e) => {
                    e.status = 400;
                });
            } else {
                await next();
            }

            if (ctx.type === 'text/html') {
                return true;
            }

            let data = null;

            if (ctx.body && typeof ctx.body === 'string') {
                try {
                    data = JSON.parse(ctx.body);
                } catch (err) {
                    data = ctx.body;
                }

                ctx.body = {
                    data: data,
                    error: {
                        code: 0,
                        message: 'success'
                    }
                };
                ctx.status = 200;
            } else if (404 === ctx.status) {
                ctx.status = 404;
                ctx.body = '请求的路径或资源不存在';
            }

            return true;
        } catch (err) {
            ctx.body = {
                data: null,
                error: {
                    code: err.code || err.status || 500,
                    message: err.message || '服务发生未知错误'
                }
            };

            if (callback) {
                callback(err, ctx);
            }

            ctx.status = 200;
        }
    };
}