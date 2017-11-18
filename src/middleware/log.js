/**
 * Created by wp on 2017-03-14.
 */
import fs from "fs";
import log4js from "log4js";
import logConfig from "../config/log";

module.exports = () => {
    log4js.configure(logConfig);

    const loggerError = log4js.getLogger("error");
    const loggerDebug = log4js.getLogger("debug");
    const loggerInfo = log4js.getLogger("app");

    const error = (value) => {
        loggerError.error(value);
    };

    const debug = (value) => {
        loggerDebug.debug(value);
    };

    const info = (value) => {
        loggerInfo.info(value);
    };

    const logMiddle = async(ctx, next) => {
        try {
            ctx.log = {
                info: info,
                debug: debug,
                error: error
            };

            global.Log = ctx.log;

            await next();
        } catch (err) {
            error(err);
        }
    };
    return logMiddle;
};