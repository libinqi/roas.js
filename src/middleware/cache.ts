import { config } from '../config/config';
import * as Cache from 'node-cache';

let middleOptions: any = {};
const prefix = middleOptions.prefix || 'roas-cache:';
const expire = middleOptions.expire || config.http.maxCache;

const nodeCache = new Cache({ stdTTL: expire, checkperiod: 120 });

const setCache = (key, value, cacheOptions) => {
    if (value == null) {
        return;
    }
    const currentOptions = cacheOptions || {};
    key = prefix + key;
    const tty = currentOptions.expire || expire;
    nodeCache.set(key, value, tty);
};

const getCache = (key) => {
    key = prefix + key;
    let data = nodeCache.get(key);
    if (data && data !== undefined) {
        return data;
    }
    return null;
};

const deleteCache = (key) => {
    key = prefix + key;
    return nodeCache.del(key);
};

export const cache = {
    get: getCache,
    set: setCache,
    del: deleteCache
};

export default function (options?) {
    middleOptions = options || {};

    const cacheMiddle = async (ctx, next) => {
        ctx.cache = {
            get: getCache,
            set: setCache,
            del: deleteCache
        };
        await next();
    };

    return cacheMiddle;
}
