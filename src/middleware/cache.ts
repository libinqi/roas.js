import { config } from '../config/config';
import * as cache from 'node-cache';

export default function (options?) {
    const middleOptions = options || {};
    const prefix = middleOptions.prefix || 'roas-cache:';
    const expire = middleOptions.expire || config.http.maxCache;

    const nodeCache = new cache({ stdTTL: expire, checkperiod: 120 });

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
        if (data && data != undefined) {
            return data;
        }
        return null;
    };

    const cacheMiddle = async function (ctx, next) {
        ctx.cache = {
            get: getCache,
            set: setCache
        };

        global['MyCache'] = ctx.cache;

        await next();
    };

    return cacheMiddle;
};
