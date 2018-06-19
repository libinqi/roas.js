/**
 * Created by wp on 2017-03-14.
 */
import * as fs from 'fs';
import * as log4js from 'log4js';
import logConfig from '../config/log';

log4js.configure(logConfig);

const loggerError = log4js.getLogger('error');
const loggerDebug = log4js.getLogger('debug');
const loggerInfo = log4js.getLogger('app');

const error = (value) => {
    loggerError.error(value);
};

const debug = (value) => {
    loggerDebug.debug(value);
};

const info = (value) => {
    loggerInfo.info(value);
};

export const logger = {
    info: info,
    debug: debug,
    error: error
};

export default () => {
    const logMiddle = async (ctx, next) => {
        try {
            ctx.log = {
                info: info,
                debug: debug,
                error: error
            };
            await next();
        } catch (err) {
            error(err);
            throw err;
        }
    };
    return logMiddle;
};