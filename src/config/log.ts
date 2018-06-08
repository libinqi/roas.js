import * as path from "path";
import { config, env } from "./config";

const log_path = path.join(process.cwd(), '/logs'); //配置目标路径 logs

export default {
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
            appenders: env === "development" ? ['out', 'debug'] : ['error'],
            level: env === "development" ? 'debug' : 'error'
        }
    }
}