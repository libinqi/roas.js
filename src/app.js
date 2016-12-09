import Koa from 'koa';
import convert from 'koa-convert';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import cors from 'koa-cors';
import logger from 'koa-logger';
import config from './config/config';
import {
    orm,
    router
} from './lib/index';
import cacheMiddle from './middleware/cache';
import RestQL from 'roas-restql';

const app = new Koa();

app.keys = [config.secretKeyBase];

// not serve static when deploy
if (config.serveStatic) {
    app.use(convert(require('koa-static')(__dirname + '/../public')));
}

//添加rest api支持
const restql = new RestQL(orm.sequelize.models);

if (config.env == 'development') {
    app.use(convert(logger()));
}

app.use(convert(json()));
app.use(convert(bodyparser()));
app.use(cors());
app.use(cacheMiddle());

app.use(restql.routes());
app.use(router.routes(), router.allowedMethods());

if (config.env == 'development') {
    app.use(async(ctx, next) => {
        try {
            const start = new Date();
            await next(); // next is now a function
            const ms = new Date() - start;
            console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
        } catch (err) {
            console.log(err);
            logger.error('server error', err, ctx);
        }
    });
} else {
    app.use(async(ctx, next) => {
        try {
            await next(); // next is now a function
        } catch (err) {
            console.log(err);
        }
    });
}

if (process.argv[2] && process.argv[2][0] == 'c') {
    const repl = require('repl');
    repl.start({
        prompt: '> ',
        useGlobal: true
    }).on('exit', () => {
        process.exit();
    });
} else {
    (async() => {
        const connection = await orm.sequelize.sync();
        if (connection) {
            app.listen(config.port, () => {
                console.log('Connect to the database and the listener port:' + config.port);
            });
        }
    })();
}

export default app;