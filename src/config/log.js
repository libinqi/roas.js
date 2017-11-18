/**
 * Created by libinqi on 2017-03-13.
 */
import path from "path";
import appConfig from "./config";

const log_path = path.join(process.cwd(), '/logs'); //配置目标路径 logs
const config = {
    appenders: {
        out: {
            type: "console"
        },
        debug: {
            type: "file",
            filename: log_path + "/out.log",
            maxLogSize: 10485760,
            pattern: "-yyyy-MM-dd",
            numBackups: 5
        },
        error: {
            type: "file",
            filename: log_path + "/error.log",
            maxLogSize: 10485760,
            pattern: "-yyyy-MM-dd",
            numBackups: 5
        }
    },
    categories: {
        default: {
            appenders: ['error'],
            level: 'error'
        }
    }
};

if (appConfig.env === "development") {
    config.categories.default.appenders = ['out', 'debug'];
    config.categories.default.level = 'debug';
}

module.exports = config;