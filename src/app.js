import Koa from 'koa';
import convert from 'koa-convert';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import config from './config/config';
import {
	orm,
	router
} from './lib/index';
import cacheMiddle from './middleware/cache';
import xload from "./middleware/xload";
import RestQL from 'roas-restql';
import cors from "koa-cors";
import path from "path";
import logMiddle from "./middleware/log";
// import koajwt from "koa-jwt";
import bodyHandlerMiddle from "./middleware/body-handler";
import http from "http";
import Net from "net";
import IO from "koa-socket.io";

const app = new Koa();
const io = new IO({
	namespace: '/'
});

app.config = config;
app.keys = [config.http.secretKeyBase];

// not serve static when deploy
if (config.http.serveStatic) {
	app.use(convert(require('koa-static')(path.join(process.cwd(), '/public'))));
}
app.use(xload(app, {
	path: path.join(process.cwd(), '/public/assets/images/avatar'),
	upload: {
		encoding: 'utf-8',
		maxFieldsSize: 2 * 1024 * 1024,
		maxFields: 1000
	}
}));

app.use(logMiddle());
// body和错误处理必须是第一个use
app.use(bodyHandlerMiddle((err, ctx) => {
	ctx.log.error(err);
}));

//添加rest api支持
const restql = new RestQL(orm.sequelize.models);
app.use(convert(json()));
app.use(bodyparser());

app.use(cacheMiddle());
app.use(cors());

// app.use(koajwt({secret: config.http.secretKeyBase}).unless({path:[/^\/getToken/]}));

app.use(router().routes(), router().allowedMethods());
app.use(restql.routes());

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
			console.log('Connected to the database');

			if (config.http) {
				app.listen(config.http.port, () => {
					console.log('http server listener port:' + config.http.port);
				});
			}
			if (config.ws) {
				const wsServer = http.createServer(app.callback());
				wsServer.listen(config.ws.wsPort, 'localhost', () => {
					console.log('web socket server listener port:' + config.ws.wsPort);
				});
				io.start(wsServer);
				io.use((ctx, next) => {
					router(ctx, next);
				});
			}
			if (config.tcp && config.tcp.provider) {
				const socketServer = Net.createServer((socket) => {
					socket.on('data', async(data) => {
						let parser = require("./api/parsers/" + config.tcp.provider);
						await parser.execute(socket, data.toString());
					})
				});
				socketServer.listen(config.tcp.port, () => {
					console.info('socket server listener port: ' + config.tcp.port);
				});
			}
		}
	})();
}

export default app;