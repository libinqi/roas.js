import * as path from 'path';
import { appPath, env } from './config';

const logPath = path.join(appPath, '/logs'); //配置目标路径 logs

export default {
    appenders: {
        out: {
            type: 'console'
        },
        debug: {
            type: 'file',
            filename: logPath + '/out.log',
            maxLogSize: 10485760,
            pattern: '-yyyy-MM-dd',
            numBackups: 5
        },
        error: {
            type: 'file',
            filename: logPath + '/error.log',
            maxLogSize: 10485760,
            pattern: '-yyyy-MM-dd',
            numBackups: 5
        }
    },
    categories: {
        default: {
            appenders: env === 'development' ? ['out', 'debug'] : ['error'],
            level: env === 'development' ? 'debug' : 'error'
        }
    }
};
