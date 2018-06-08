import { config } from '../config/config';
import * as Cache from 'node-cache';

let middleOptions: any = {};
const prefix = middleOptions.prefix || 'roas-cache:';
const expire = middleOptions.expire || config.http.maxCache;

const nodeCache = new Cache({ stdTTL: expire, checkperiod: 120 });

const setCache = function (key, value, cacheOptions) {
    if (value == null) {
        return;
    }
    const currentOptions = cacheOptions || {};
    key = prefix + key;
    const tty = currentOptions.expire || expire;
    nodeCache.set(key, value, tty);
};

const getCache = function (key) {
    key = prefix + key;
    let data = nodeCache.get(key);
    if (data && data !== undefined) {
        return data;
    }
    return null;
};

export const cache = {
    get: getCache,
    set: setCache
};

export default function (options?) {
    middleOptions = options || {};

    const cacheMiddle = async function (ctx, next) {
        ctx.cache = {
            get: getCache,
            set: setCache
        };
        await next();
    };

    return cacheMiddle;
}
