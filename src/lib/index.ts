import * as path from 'path';
import * as mount from 'roas-mount';
import Router from './router';
import { config } from '../config/config';

let provider = config.http.provider || '';

/*
 *加载控制器
 * param:dir(控制器文件目录,默认路径为当前项目src/api/controllers)
 */
global['$controllers'] = mount(path.join(__dirname, '../', 'api/controllers', provider));

/*
 *加载路由
 * param:dir(路由文件目录,默认路径为当前项目src/api/routes)
 */
global['$routes'] = mount(path.join(__dirname, '../', 'api/routes', provider));

export default Router;