import { logger } from '../middleware/log';

interface RouterAction {
    httpMethod: string;
    constructor: any;
    handler: string;
}

interface RouterActionArray {
    [key: string]: Array<{
        httpMethod: string,
        constructor: any,
        handler: string
    }>;
}

interface Decorator {
    (target: any, propertyKey?: string): void;
}

export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    DELETE = 'delete',
    OPTIONS = 'options',
    PUT = 'put',
    WS = 'ws',
}

class Router {
    router: RouterActionArray = {};
    setRouter(url: string, routerAction: RouterAction) {
        const _router = this.router[url];
        if (_router) {
            //检查http method 是否冲突
            for (const index in _router) {
                const object = _router[index];
                if (((object.constructor.url || '') + url === url) && object.httpMethod === routerAction.httpMethod) {
                    logger.error(`路由地址 ${object.httpMethod} ${url} 已经存在`);
                    return;
                }
            }
            //不冲突则注册
            this.router[url].push(routerAction);
        } else {
            this.router[url] = [];
            this.router[url].push(routerAction);
        }
    }

    getRouter() {
        return this.router;
    }
}

export const router: Router = <any>new Router();

export function route(url: string, httpMethod?: HttpMethod): Decorator {
    return (target: any, propertyKey?: string) => {
        if (typeof target === 'function') {
            target['url'] = url;
        } else if (propertyKey) {
            router.setRouter(url, {
                httpMethod: httpMethod || HttpMethod.GET,
                constructor: target.constructor,
                handler: propertyKey
            });
        }
    };
}