import * as errors from '../../config/errors';
import { logger } from '../../middleware/log';
import { UserService } from '../services';
import { UserAttributes, UserInstance } from '../models/User';

export async function list(ctx) {
    logger.debug('获取用户信息');
    ctx.body = await new UserService().getUserList();
}

export async function getUser(ctx) {
    let userId = ctx.query.userId;
    if (!userId) {
        ctx.throw(errors.customErrors.notUserId);
    }
    let user: UserAttributes = await new UserService().getUser(userId);
    ctx.body = user;
}

export async function getUserForWS(ctx) {
    let userId = ctx.data.userId;
    if (!userId) {
        ctx.throw(errors.customErrors.notUserId);
    }
    let user: UserAttributes = await new UserService().getUser(userId);
    ctx.socket.emit('data', user);
}