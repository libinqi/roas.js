/**
 * Created by libinqi on 2016/11/15.
 */
import * as errors from '../../config/errors';
import {
    UserService
} from '../services';

export async function list(ctx, next) {
    Log.debug('获取用户信息');
    ctx.body = 'user';
}

export async function getUser(ctx, next) {
    let userId = ctx.query.userId;
    if (!userId) {
        ctx.throw(errors.CustomErrors.NotUserId);
    }
    ctx.body = await new UserService().getUser(userId);
}

export async function getUserForWS(ctx, next) {
    console.info(ctx.data);
    let userId = ctx.data.userId;
    if (!userId) {
        ctx.throw(errors.CustomErrors.NotUserId);
    }
    let result = await new UserService().getUser(userId);
    ctx.socket.emit('data', result);
}